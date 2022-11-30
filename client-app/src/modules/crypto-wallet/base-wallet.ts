export default abstract class BaseWallet {
    abstract connect(network: any): Promise<string>;
    abstract signMessage(message: string): Promise<string>;
    abstract registerEventChannel(emit: any): any;
}
