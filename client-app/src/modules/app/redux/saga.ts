import { loginSaga } from '@auth/redux/login/saga';
import { all } from 'redux-saga/effects';

export function* appSaga() {
    yield all([loginSaga()]);
}
