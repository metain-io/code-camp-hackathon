import { resolveGenerator } from '@libs/utils';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { accountActions, TokenBalance } from './slice';
import UserPoolService, { PoolTypeEnum } from '@auth/services/user-pool';
import AuthService from '@auth/services/auth';
import { eventChannel } from 'redux-saga';
import logger from '@libs/logger';
import CryptoWallet, { CryptoWalletEvent } from '@crypto-wallet/crypto-wallet';
import PhantomWallet from '@crypto-wallet/wallet-adapters/phantom-wallet-adapter';
import WalletService from '@crypto-wallet/services/crypto-wallet-service';
import MetainApi from '@api/metain';
import { ExchangeRateItem } from '@business/dashboard/hooks/use-dashboard';

function* handleGetTokenBalanceRequested(): any {
    logger.info('saga/account/handleGetTokenBalanceRequested');

    try {
        const [tmpBalances, exchangeRateList] = yield all([
            WalletService._currentWallet?.getBalances(),
            MetainApi.oracle.getExchangeRateList(),
        ]);

        const entries = Object.entries(tmpBalances);
        const tokenBalances: { [symbol: string]: TokenBalance } = {};

        entries &&
        entries.length > 0 &&
        entries.forEach((item, idx: number) => {
            const exchangeRateItem: ExchangeRateItem | undefined = exchangeRateList?.find(
                (value: ExchangeRateItem, index: number) => {
                    return value?.coin === item[0];
                },
            );
            const currentPrice = exchangeRateItem?.max_usdt_rate ?? 0;
            const tokenAmount: number = item[1] as number

            tokenBalances[item[0]] = {
                price: currentPrice,
                amount: tokenAmount,
            };
        });

        yield put(accountActions.getTokenBalanceSucceed(tokenBalances));
    } catch (error: any) {
        logger.error('saga/account/handleGetTokenBalanceRequested/ERROR: ', error)
    }
}

function* handleGetNftBalanceRequested(): any {
    logger.info('saga/account/handleGetNftBalanceRequested');

    try {
        const tmpNftBalance = yield (WalletService._currentWallet?.getNftBalance());

        const entries = Object.entries(tmpNftBalance);
        const nftBalances: { [symbol: string]: TokenBalance } = {};

        entries &&
        entries.length > 0 &&
        entries.forEach((item, idx: number) => {
            const currentPrice = 10;        // TODO: Temporary hard code
            const tokenAmount: number = item[1] as number

            nftBalances[item[0]] = {
                price: currentPrice,
                amount: tokenAmount,
            };
        });
        
        yield put(accountActions.getNftBalanceSucceed(nftBalances));
    } catch (error: any) {
        logger.error('saga/account/handleGetNftBalanceRequested/ERROR: ', error)
    }
}

export function* accountSaga() {
    // yield fork(init);

    yield takeLatest(accountActions.getTokenBalanceRequested.type, handleGetTokenBalanceRequested);
    yield takeLatest(accountActions.getNftBalanceRequested.type, handleGetNftBalanceRequested);
    // yield takeLatest(loginActions.logoutRequested.type, handleLogout);
}
