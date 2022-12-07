import { loginSaga } from '@auth/redux/login/saga';
import { userDividendSaga } from '@business/claim-devidends/redux/user-dividend/saga';
import { all } from 'redux-saga/effects';

export function* appSaga() {
    yield all([loginSaga(), userDividendSaga()]);
}
