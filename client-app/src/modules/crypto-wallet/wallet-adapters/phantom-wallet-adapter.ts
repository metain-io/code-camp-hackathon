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
                label: 'USDT',
                value: 'A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr',
                icon: '/svg/icon-token-usdt.svg',
                decimalNo: BigInt(Math.pow(10, 6)),
            },
            {
                label: 'USDC',
                value: '3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc',
                icon: '/svg/icon-token-usdc.svg',
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

    async getNftInfo() {
        const nftAddress = '2nUTrUfTeucGLBqoW89rwiFZbwWAoGkYWhsLFWXUBM7h';

        try {
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

            const APPLICATION_IDX = 1670006191;
            const uid = new anchor.BN(APPLICATION_IDX.toString());

            const uidBuffer: any = uid.toArray("le", 8);
            let [escrowWalletPubKey, walletBump] = web3.PublicKey.findProgramAddressSync(
                [
                    Buffer.from('wallet'),
                    new web3.PublicKey('621i9tL4tRBgt2PRbHynqSdYxPEd3KvpVkKX3chge3mU').toBuffer(),
                    new web3.PublicKey('3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc').toBuffer(),
                    new web3.PublicKey(nftAddress).toBuffer(),
                    uidBuffer,
                ],
                new web3.PublicKey('EbgwApfZNUQxGEqG2uJV5wkBVTZomp1ccDu7BuFsDKdY'),
            );
            const nftRemainSupply = await connection.getTokenAccountBalance(escrowWalletPubKey);

            const mintInfo = await SPL.getMint(connection, new web3.PublicKey(nftAddress))
            // mintInfo.supply
            // minInfo.mintAuthority.toBase58()

            logger.debug('=== PhantomWallet - getNftInfo - RS: ', {
                mintInfo,
                mintInfoSupply: mintInfo.supply,
                remainingSupply: nftRemainSupply?.value.amount,
                walletPubKeyString: escrowWalletPubKey.toBase58(), 
                walletBump
            });
        } catch (error: any) {
            logger.debug('=== PhantomWallet - getNftInfo - ERROR: ', error);
            return {};
        }
    }

    async getBalances(userWalletAddress: string): Promise<{ [symbol: string]: number | bigint; }> {
        const tmpBalances: { [name: string]: number | bigint } = {};
        try {
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            const tokenAccounts = await connection.getTokenAccountsByOwner(new web3.PublicKey(userWalletAddress), {
                programId: SPL.TOKEN_PROGRAM_ID,
            });
            const solAmount = await connection.getBalance(new web3.PublicKey(userWalletAddress));

            tmpBalances['SOL'] = BigInt(solAmount) / BigInt(web3.LAMPORTS_PER_SOL);
            tokenAccounts?.value?.forEach((tokenAccount) => {
                const accountData = SPL.AccountLayout.decode(tokenAccount.account.data);

                const relatedToken = this._tokenConfig?.find((item, index) => {
                    return item.value == accountData.mint.toBase58();
                });
                if (relatedToken) {
                    tmpBalances[relatedToken.label] = accountData.amount / relatedToken.decimalNo;
                }
            });
            logger.debug('=== PhantomWallet - getBalances - BALANCE: ', tmpBalances);
        } catch (error: any) {
            logger.debug('=== PhantomWallet - getBalances - ERROR: ', error);
            return {};
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
            throw new Error('AAAA');
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

        const TREASURY_ADDRESS = '621i9tL4tRBgt2PRbHynqSdYxPEd3KvpVkKX3chge3mU';
        const APPLICATION_IDX = 1670006191;
        const PROGRAM_ID = 'EbgwApfZNUQxGEqG2uJV5wkBVTZomp1ccDu7BuFsDKdY';

        const connection = getConnection();

        // const mintUSDT = new PublicKey('A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr');
        const mintUSDC = new PublicKey('3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc');
        const mintVOT1 = new PublicKey('2nUTrUfTeucGLBqoW89rwiFZbwWAoGkYWhsLFWXUBM7h');

        const treasurerPublicKey = new PublicKey(TREASURY_ADDRESS);
        const walletPublicKey = new PublicKey(this._walletAccount);
        const programPublicKey = new PublicKey(PROGRAM_ID);

        const program = new anchor.Program(IDL, PROGRAM_ID, this._provider);

        const payer = Keypair.generate();

        const pda = await getPdaParams(programPublicKey, APPLICATION_IDX, treasurerPublicKey, mintUSDC, mintVOT1);

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

const waitTransactionFinalized = async (connection: any, signature: any, timeoutLimit = 30 * 1000) => {
    let signatureStatus;
    let startTime = Date.now();
    do {
        signatureStatus = await connection.getSignatureStatus(signature);

        if (Date.now() - startTime > timeoutLimit) {
            throw new Error('Timeout');
        }
    } while (signatureStatus.value?.confirmationStatus != 'finalized');
};
