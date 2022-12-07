import { loginSaga } from '@auth/redux/login/saga';
import { userDividendSaga } from '@business/user-dividends/redux/saga';
import { accountSaga } from 'modules/account/redux/saga';
import { all } from 'redux-saga/effects';

export function* appSaga() {
    yield all([
        loginSaga(), 
        accountSaga(),
        userDividendSaga()
    ]);
}
