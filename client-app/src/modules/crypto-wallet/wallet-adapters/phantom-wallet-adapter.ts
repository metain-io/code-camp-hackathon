import bs58 from 'bs58';
import nacl from 'tweetnacl';
import * as web3 from '@solana/web3.js';
import * as SPL from '@solana/spl-token';
import CryptoWallet, { CryptoWalletEvent, SelectedToken, TokenConfig } from '../crypto-wallet';
import logger from '@libs/logger';
import * as anchor from '@project-serum/anchor';
import { getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js';
import { IDL } from '../data/program-idls/offering-idl';

export default class PhantomWallet extends CryptoWallet {
    _provider: any;
    _walletAccount?: string;
    _tokenConfig?: Array<TokenConfig>;

    constructor() {
        super();

        const provider = (window as any)?.phantom?.solana;

        this._provider = provider;
        this._tokenConfig = [
            {
                label: 'USDC',
                value: process.env.NEXT_PUBLIC_MINT_USDC_ADDRESS || '',
                icon: '/svg/icon-token-usdc.svg',
                decimalNo: BigInt(Math.pow(10, 6)),
            },
            {
                label: 'USDT',
                value: process.env.NEXT_PUBLIC_MINT_USDT_ADDRESS || '',
                icon: '/svg/icon-token-usdt.svg',
                decimalNo: BigInt(Math.pow(10, 6)),
            },
        ];
    }

    get walletAccount(): string | undefined {
        return this._walletAccount;
    }

    get available(): boolean {
        return this._provider?.isPhantom;
    }

    get supportUrl(): string | undefined {
        return undefined;
    }

    get downloadUrl(): string | undefined {
        return 'https://phantom.app/download';
    }

    get tokenForSelect(): Array<SelectedToken> {
        return (
            this._tokenConfig?.map((item, idx) => {
                return {
                    label: item.label,
                    value: item.value,
                    icon: item.icon,
                };
            }) || []
        );
    }

    async connect(network: any): Promise<string> {
        const connectResult = await this._provider.connect();

        const walletAddress = connectResult?.publicKey?.toString();

        this._walletAccount = walletAddress;

        return walletAddress;
    }

    async disconnect(): Promise<void> {
        this._provider.emit('disconnect');
    }

    async signMessage(message: string): Promise<string> {
        const encodedMessage = new TextEncoder().encode(message);

        const signMessageResult = await this._provider.signMessage(encodedMessage, 'utf8');

        const { signature, publicKey } = signMessageResult;

        const signatureVerified = await new Promise((resolve, reject) => {
            try {
                resolve(
                    nacl.sign.detached.verify(Uint8Array.from(Buffer.from(message)), signature, publicKey.toBuffer()),
                );
            } catch (error) {
                reject(error);
            }
        });

        if (!signatureVerified) {
            throw new Error('Verify signature failed');
        }

        return `${this._walletAccount}|${bs58.encode(signature)}`;
    }

    async getNftBalance(): Promise<any> {
        let tmpBalances: { [nftAddress: string]: number | bigint } = {};
        console.log('=============== getNftBalance - associatedNftAccount - INIT ')
        try {
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            // const payer = web3.Keypair.generate();
            const payer = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_BOSS_WALLET_PRIVATE_KEY!));
            const nftPublicKey = new web3.PublicKey(process.env.NEXT_PUBLIC_MINT_NFT_ADDRESS || '');
            const walletPublicKey = new web3.PublicKey(this.walletAccount || '');

            const associatedNftAccount = await SPL.getOrCreateAssociatedTokenAccount(connection, payer, nftPublicKey, walletPublicKey);

            tmpBalances = {[nftPublicKey.toBase58()]: associatedNftAccount.amount};
            logger.debug('=== PhantomWallet - getNftBalance - RS: : ', {
                tmpBalances,
                associatedNftAccount,
                associatedNftAccount_address: associatedNftAccount.address.toBase58(),
                XXX: walletPublicKey.toBase58(),
            });
        } catch (error: any) {
            logger.debug('=== PhantomWallet - getNftBalance - ERROR: ', error);
            throw(Error('Some thing went wrong when get NFT balance'));
        }
        return tmpBalances;
    }

    async getBalances(): Promise<{ [symbol: string]: number | bigint; }> {
        const tmpBalances: { [name: string]: number | bigint } = {};
        try {
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            const tokenAccounts = await connection.getTokenAccountsByOwner(new web3.PublicKey(this._walletAccount || ''), {
                programId: SPL.TOKEN_PROGRAM_ID,
            });
            const solAmount = await connection.getBalance(new web3.PublicKey(this._walletAccount || ''));

            tmpBalances['SOL'] = Number(BigInt(solAmount) * BigInt(100) / BigInt(web3.LAMPORTS_PER_SOL)) / 100;
            tokenAccounts?.value?.forEach((tokenAccount) => {
                const accountData = SPL.AccountLayout.decode(tokenAccount.account.data);

                const relatedToken = this._tokenConfig?.find((item, index) => {
                    return item.value == accountData.mint.toBase58();
                });
                if (relatedToken) {
                    tmpBalances[relatedToken.label] = Number(accountData.amount * BigInt(100) / relatedToken.decimalNo) / 100;
                }
            });
            logger.debug('=== PhantomWallet - getBalances - BALANCE: ', tmpBalances);
        } catch (error: any) {
            logger.debug('=== PhantomWallet - getBalances - ERROR: ', error);
            throw(Error('Some thing went wrong when get Token balance'));
        }
        return tmpBalances;
    }

    eventChannelEmitter = (emit: any) => {
        const handleConnect = () => {
            emit({ type: CryptoWalletEvent.WalletConnect });
        };

        const handleDisconnect = () => {
            emit({ type: CryptoWalletEvent.WalletDisconnect });
        };

        const handleAccountChanged = (publicKey: any) => {
            emit({ type: CryptoWalletEvent.WalletAccountChanged, payload: { walletAccount: publicKey.toString() } });
        };

        this._provider.on('connect', handleConnect);
        this._provider.on('accountChanged', handleAccountChanged);
        this._provider.on('disconnect', handleDisconnect);

        return () => {
            this._provider.off('connect', handleConnect);
            this._provider.off('accountChanged', handleAccountChanged);
            this._provider.off('disconnect', handleDisconnect);
        };
    };

    async purchaseNft(amount: number): Promise<void> {
        if (!this._walletAccount || !this._provider) {
            throw new Error('wallet account is not present');
        }

        const balances = await this.getBalances();

        if (balances?.['USDC'] < amount) {
            throw new Error('balance not enough');
        }

        const getConnection = () => {
            const connection = new Connection(clusterApiUrl('devnet'));
            return connection;
        };

        const getPdaParams = async (
            programId: anchor.web3.PublicKey,
            baseUid: number,
            signer: anchor.web3.PublicKey,
            mintUSD: anchor.web3.PublicKey,
            mintNFT: anchor.web3.PublicKey,
        ): Promise<any> => {
            const uid = new anchor.BN(baseUid.toString());
            const uidBuffer = Buffer.from(uid.toArray('le', 8));

            let [statePubKey, stateBump] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from('state'), signer.toBuffer(), mintUSD.toBuffer(), mintNFT.toBuffer(), uidBuffer],
                programId,
            );
            let [walletPubKey, walletBump] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from('wallet'), signer.toBuffer(), mintUSD.toBuffer(), mintNFT.toBuffer(), uidBuffer],
                programId,
            );

            return {
                stateBump,

                idx: uid,
                stateKey: statePubKey,
                escrowBump: walletBump,
                escrowWalletKey: walletPubKey,
            };
        };

        const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS || '';
        const APPLICATION_IDX = parseInt(process.env.NEXT_PUBLIC_APPLICATION_IDX || '0');
        const PROGRAM_ID = process.env.NEXT_PUBLIC_MINT_TRADE_PROGRAM_ADDRESS || '';

        const connection = getConnection();

        // const mintUSDT = new PublicKey(process.env.NEXT_PUBLIC_MINT_USDT_ADDRESS || '');
        const mintUSDC = new PublicKey(process.env.NEXT_PUBLIC_MINT_USDC_ADDRESS || '');
        const mintVOT1 = new PublicKey(process.env.NEXT_PUBLIC_MINT_NFT_ADDRESS || '');

        const treasurerPublicKey = new PublicKey(TREASURY_ADDRESS);
        const walletPublicKey = new PublicKey(this._walletAccount);
        const programPublicKey = new PublicKey(PROGRAM_ID);

        const program = new anchor.Program(IDL, PROGRAM_ID, this._provider);

        const pda = await getPdaParams(programPublicKey, APPLICATION_IDX, treasurerPublicKey, mintUSDC, mintVOT1);

        const payer = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_BOSS_WALLET_PRIVATE_KEY!));
        const [buyerUsdWallet, treasurerUsdWallet, buyerNftWallet] = await Promise.all([
            getOrCreateAssociatedTokenAccount(connection, payer, mintUSDC, walletPublicKey),
            getOrCreateAssociatedTokenAccount(connection, payer, mintUSDC, treasurerPublicKey),
            getOrCreateAssociatedTokenAccount(connection, payer, mintVOT1, walletPublicKey),
        ]);

        const transaction = await program.methods
            .buy(new anchor.BN(pda.idx), pda.stateBump, pda.escrowBump, new anchor.BN(amount))
            .accounts({
                applicationState: pda.stateKey,
                escrowNftWalletState: pda.escrowWalletKey,
                buyerUsdWallet: buyerUsdWallet.address,
                treasurerUsdWallet: treasurerUsdWallet.address,
                buyerNftWallet: buyerNftWallet.address,
                buyer: walletPublicKey,
                mintOfNft: mintVOT1,
                mintOfUsd: mintUSDC,
                treasurer: treasurerPublicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .signers([])
            .transaction();

        const latestBlockHash = await connection.getLatestBlockhash();

        transaction.recentBlockhash = latestBlockHash.blockhash;
        transaction.feePayer = walletPublicKey;

        const { signature } = await this._provider.signAndSendTransaction(transaction);
        await waitTransactionFinalized(connection, signature);
    }
}

const waitTransactionFinalized = async (connection: any, signature: any, timeoutLimit = 5 * 60 * 1000) => {
    let signatureStatus;
    let startTime = Date.now();
    do {
        signatureStatus = await connection.getSignatureStatus(signature);

        if (Date.now() - startTime > timeoutLimit) {
            throw new Error('Timeout');
        }
    } while (signatureStatus.value?.confirmationStatus != 'finalized');
};
