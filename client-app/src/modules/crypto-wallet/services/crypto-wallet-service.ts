import CryptoWallet from '../crypto-wallet';

class CryptoWalletService {
    _currentWallet?: CryptoWallet;

    set currentWallet(wallet: CryptoWallet | undefined) {
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

    async disconnect(): Promise<void> {
        if (!this._currentWallet) {
            throw new Error('_currentWallet is undefined');
        }

        return await this._currentWallet.disconnect();
    }

    async signMessage(message: string): Promise<string> {
        if (!this._currentWallet) {
            throw new Error('_currentWallet is undefined');
        }

        return await this._currentWallet.signMessage(message);
    }
}

export default new CryptoWalletService();
