import bs58 from 'bs58';
import nacl from 'tweetnacl';
import BaseWallet from '../base-wallet';

export default class PhantomWallet extends BaseWallet {
    provider: any;
    walletAddress?: string;

    constructor() {
        super();

        const provider = (window as any)?.phantom?.solana;

        if (!provider?.isPhantom) {
            throw new Error('Wallet cannot be detected');
        }

        this.provider = provider;
    }

    async connect(network: any): Promise<string> {
        const connectResult = await this.provider.connect();

        const walletAddress = connectResult?.publicKey?.toString();

        this.walletAddress = walletAddress;

        return walletAddress;
    }

    async disconnect(): Promise<void> {
        this.provider.emit('disconnect');
    }

    async signMessage(message: string): Promise<string> {
        const encodedMessage = new TextEncoder().encode(message);

        const signMessageResult = await this.provider.signMessage(encodedMessage, 'utf8');

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

        return `${this.walletAddress}|${bs58.encode(signature)}`;
    }

    registerEventChannel = (emit: any) => {
        const handleConnect = () => {
            emit({ type: 'WALLET_CONNECT' });
        };

        const handleDisconnect = () => {
            emit({ type: 'WALLET_DISCONNECT' });
        };

        const handleAccountChanged = (publicKey: any) => {
            emit({ type: 'ACCOUNT_CHANGED', payload: { walletAccount: publicKey.toString() } });
        };

        this.provider.on('connect', handleConnect);
        this.provider.on('accountChanged', handleAccountChanged);
        this.provider.on('disconnect', handleDisconnect);

        return () => {
            this.provider.off('connect', handleConnect);
            this.provider.off('accountChanged', handleAccountChanged);
            this.provider.off('disconnect', handleDisconnect);
        };
    };
}
