export type TokenConfig = SelectedToken & {
    decimalNo: bigint;
};

export type SelectedToken = {
    label: string;
    value: string;
    icon: string | undefined;
};

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
    abstract get tokenForSelect(): Array<SelectedToken>;
    abstract connect(network: any): Promise<string>;
    abstract disconnect(): Promise<void>;
    abstract signMessage(message: string): Promise<string>;
    abstract getBalances(): Promise<{ [symbol: string]: number | bigint }>;
    abstract getNftBalance(): Promise<any>;
    abstract eventChannelEmitter(emit: any): any;
    abstract purchaseNft(amount: number): Promise<void>;
}
