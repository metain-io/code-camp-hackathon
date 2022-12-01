import bs58 from 'bs58';
import nacl from 'tweetnacl';
import CryptoWallet, { CryptoWalletEvent } from '../crypto-wallet';

export default class PhantomWallet extends CryptoWallet {
    _provider: any;
    _walletAccount?: string;

    constructor() {
        super();

        const provider = (window as any)?.phantom?.solana;

        this._provider = provider;
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
