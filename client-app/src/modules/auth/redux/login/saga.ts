import { resolveGenerator } from '@libs/utils';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { loginActions, LoginStatus } from './slice';
import UserPoolService, { PoolTypeEnum } from '@auth/services/user-pool';
import AuthService from '@auth/services/auth';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { eventChannel } from 'redux-saga';
import logger from '@libs/logger';
import BaseWallet from '@crypto-wallet/base-wallet';
import PhantomWallet from '@crypto-wallet/wallet-adapters/phantom-wallet-adapter';
import WalletService from '@crypto-wallet/services/wallet-service';

function createWalletEventChannel(wallet: BaseWallet) {
    return eventChannel(wallet.registerEventChannel);
}

function* watchWalletEventChannel(walletProvider: any): any {
    const walletEventChannel = yield call(createWalletEventChannel, walletProvider);

    while (true) {
        try {
            const { type, payload } = yield take(walletEventChannel);

            switch (type) {
                case 'WALLET_CONNECT':
                    console.log('wallet-connected');
                    break;
                case 'WALLET_DISCONNECT':
                    console.log('wallet-disconnect');
                    break;
                case 'ACCOUNT_CHANGED':
                    const { walletAccount } = payload;
                    console.log('account-changed', walletAccount);
                    yield put(loginActions.logoutRequested());
                    break;
            }
        } catch (error) {
            logger.error('watchWalletEventChannelError', error);
        }
    }
}

function* init(): any {
    yield put(loginActions.initRequested());

    yield call(resolveGenerator, UserPoolService.syncUserPoolStorage(PoolTypeEnum.CONFIDENT));

    const [loadedUser, loadUserFromStorageError] = yield call(
        resolveGenerator,
        UserPoolService.loadUserFromStorage(PoolTypeEnum.CONFIDENT),
    );

    if (!loadedUser || loadUserFromStorageError) {
        yield put(
            loginActions.initFinished({
                status: LoginStatus.NotLogged,
                username: null,
            }),
        );

        return;
    }

    AuthService.currentUser = loadedUser;

    if (!AuthService.currentUserSessionValid()) {
        yield put(
            loginActions.initFinished({
                status: LoginStatus.NotLogged,
                username: null,
            }),
        );

        return;
    }

    const username = loadedUser.getUsername();

    WalletService.currentWallet = new PhantomWallet();

    const [walletAccount, connectError] = yield call(resolveGenerator, WalletService.connect(null));

    if (connectError) {
        yield put(
            loginActions.initFinished({
                status: LoginStatus.NotLogged,
                username: null,
            }),
        );

        return;
    }

    if (!walletAccount) {
        yield put(
            loginActions.initFinished({
                status: LoginStatus.NotLogged,
                username: null,
            }),
        );

        return;
    }

    if (walletAccount.toLowerCase() != username.split('-')[3].toLowerCase()) {
        yield put(
            loginActions.initFinished({
                status: LoginStatus.NotLogged,
                username: null,
            }),
        );

        return;
    }

    yield put(
        loginActions.initFinished({
            status: LoginStatus.LoggedIn,
            username: username,
            walletAddress: walletAccount,
        }),
    );

    yield fork(watchWalletEventChannel, WalletService.currentWallet);
}

function* handleLoginWithPhantomWallet(): any {
    WalletService.currentWallet = new PhantomWallet();

    const [walletAccount, connectError] = yield call(resolveGenerator, WalletService.connect(null));

    if (connectError) {
        yield put(loginActions.loginFailed({ error: new Error('Connect failed') }));
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

    let cognitoUser = registerUserResult?.user || UserPoolService.createUser(username, PoolTypeEnum.CONFIDENT);

    AuthService.currentUser = cognitoUser;

    const [authenticateUserResult, authenticateUserError] = yield call(
        resolveGenerator,
        AuthService.authenticateUser(username, password, true),
    );

    if (authenticateUserError) {
        yield put(loginActions.loginFailed({ error: new Error('Authenticate failed') }));
        return;
    }

    if (!authenticateUserResult?.customChallange?.challengeParameters?.message) {
        yield put(loginActions.loginFailed({ error: new Error('No challenge found') }));
        return;
    }

    const message = authenticateUserResult.customChallange.challengeParameters.message;

    const [challengeAnswer, signMessageError] = yield call(resolveGenerator, WalletService.signMessage(message));

    if (signMessageError) {
        yield put(loginActions.loginFailed({ error: new Error('Sign message failed') }));
        return;
    }

    const [sendChallengeAnswerResult, sendChallengeAnswerError] = yield call(
        resolveGenerator,
        AuthService.sendCustomChallengeAnswer(challengeAnswer),
    );

    if (sendChallengeAnswerError) {
        yield put(loginActions.loginFailed({ error: new Error('Send challenge answer error') }));
        return;
    }

    if (!sendChallengeAnswerResult?.session) {
        yield put(loginActions.loginFailed({ error: new Error('Send challenge answer failed') }));
        return;
    }

    yield put(
        loginActions.loginSucceeded({
            username: username,
            walletAddress: walletAccount,
        }),
    );

    yield fork(watchWalletEventChannel, WalletService.currentWallet);
}

function* handleLogout() {
    if (AuthService.currentUser) {
        yield call([AuthService, AuthService.globalSignOutUser]);
        yield call([AuthService, AuthService.signOutUser]);
    }
}

export function* loginSaga() {
    yield fork(init);

    yield takeLatest(loginActions.loginWithPhantomWalletRequested.type, handleLoginWithPhantomWallet);
    yield takeLatest(loginActions.logoutRequested.type, handleLogout);
}
