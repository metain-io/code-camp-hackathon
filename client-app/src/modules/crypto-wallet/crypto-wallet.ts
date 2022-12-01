export enum CryptoWalletEvent {
    WalletConnect = 'WALLET_CONNECT',
    WalletDisconnect = 'WALLET_DISCONNECT',
    WalletAccountChanged = 'WALLET_ACCOUNT_CHANGED',
    WalletNetworkChanged = 'WALLET_NETWORK_CHANGED',
}

export default abstract class CryptoWallet {
    abstract get walletAccount(): string | undefined;
    abstract get available(): boolean;
    abstract get supportUrl(): string | undefined;
    abstract get downloadUrl(): string | undefined;
    abstract connect(network: any): Promise<string>;
    abstract disconnect(): Promise<void>;
    abstract signMessage(message: string): Promise<string>;
    abstract eventChannelEmitter(emit: any): any;
}
