import bs58 from 'bs58';
import nacl from 'tweetnacl';
import * as web3 from '@solana/web3.js';
import * as SPL from '@solana/spl-token';
import CryptoWallet, { CryptoWalletEvent, SelectedToken, TokenConfig } from '../crypto-wallet';
import logger from '@libs/logger';

export default class PhantomWallet extends CryptoWallet {
    _provider: any;
    _walletAccount?: string;
    _tokenConfig?: Array<TokenConfig>

    constructor() {
        super();

        const provider = (window as any)?.phantom?.solana;

        this._provider = provider;
        this._tokenConfig = [
            {
                label: 'USDT',
                value: 'A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr',
                icon: '/svg/icon-token-usdt.svg',
                decimalNo: BigInt(Math.pow(10, 6))
            },
            {
                label: 'USDC',
                value: '3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc',
                icon: '/svg/icon-token-usdc.svg',
                decimalNo: BigInt(Math.pow(10, 6))
            },
        ]
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
        return this._tokenConfig?.map((item, idx) => {
            return {
                label: item.label,
                value: item.value,
                icon: item.icon
            }
        }) || [];
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
}
