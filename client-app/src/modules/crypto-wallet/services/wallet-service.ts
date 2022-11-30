import BaseWallet from '../base-wallet';

class WalletService {
    _currentWallet?: BaseWallet;

    set currentWallet(wallet: BaseWallet | undefined) {
        this._currentWallet = wallet;
    }

    get currentWallet() {
        return this._currentWallet;
    }

    async connect(network: any): Promise<string> {
        if (!this._currentWallet) {
            throw new Error('_currentWallet is undefined');
        }

        return await this._currentWallet.connect(network);
    }

    async signMessage(message: string): Promise<string> {
        if (!this._currentWallet) {
            throw new Error('_currentWallet is undefined');
        }

        return await this._currentWallet.signMessage(message);
    }
}

export default new WalletService();
