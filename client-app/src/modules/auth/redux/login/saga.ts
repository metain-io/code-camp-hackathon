import logger from '@libs/logger';
import { resolveGenerator } from '@libs/utils';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginActions } from './slice';
import UserPoolService, { PoolTypeEnum } from '@auth/services/user-pool';
import UserService from '@auth/services/user';
import AuthService from '@auth/services/auth';

function* init() {
    logger.info('LoginSaga Init');
}

function* handleLoginWithPhantomWallet(): any {
    logger.info('Handle login with phantom wallet');

    const provider = (window as any)?.phantom?.solana;

    if (!provider?.isPhantom) {
        yield put(loginActions.loginFailed({ error: new Error('Wallet cannot be detected') }));
        return;
    }

    const [connectResponse, connectError] = yield call(resolveGenerator, provider.connect());

    if (connectError) {
        yield put(loginActions.loginFailed({ error: new Error('Connect failed') }));
        return;
    }

    const walletAccount = connectResponse?.publicKey?.toString();

    if (!walletAccount) {
        yield put(loginActions.loginFailed({ error: new Error('Connect get wallet account') }));
        return;
    }

    const username = `w-sol-t-${walletAccount}`;
    const password = 'MetainDummyPassword' + Date.now().toString();

    const [registerUserResult, registerUserError] = yield call(
        resolveGenerator,
        UserPoolService.registerUser(username, password, [], PoolTypeEnum.CONFIDENT),
    );

    if (registerUserError && registerUserError?.name != 'UsernameExistsException') {
        yield put(loginActions.loginFailed({ error: new Error('Connect get wallet account') }));
        return;
    }
}

export function* loginSaga() {
    yield call(init);

    yield takeLatest(loginActions.loginWithPhantomWalletRequested.type, handleLoginWithPhantomWallet);
}
