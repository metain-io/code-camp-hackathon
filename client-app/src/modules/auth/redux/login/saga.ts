import { resolveGenerator } from '@libs/utils';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginActions, LoginStatus } from './slice';
import UserPoolService, { PoolTypeEnum } from '@auth/services/user-pool';
import AuthService from '@auth/services/auth';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

function* init() {
    yield put(loginActions.initRequested());

    yield put(
        loginActions.initFinished({
            status: LoginStatus.NotLogged,
            username: null,
        }),
    );
}

function* handleLoginWithPhantomWallet(): any {
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

    const encodedMessage = new TextEncoder().encode(message);

    const [signMessageResult, signMessageError] = yield call(
        resolveGenerator,
        provider.signMessage(encodedMessage, 'utf8'),
    );

    if (signMessageError) {
        yield put(loginActions.loginFailed({ error: new Error('Sign message failed') }));
        return;
    }

    const { signature, publicKey } = signMessageResult;

    const [signatureVerified, verifySignatureError] = yield call(
        resolveGenerator,
        new Promise((resolve, reject) => {
            try {
                resolve(
                    nacl.sign.detached.verify(Uint8Array.from(Buffer.from(message)), signature, publicKey.toBuffer()),
                );
            } catch (error) {
                reject(error);
            }
        }),
    );

    if (verifySignatureError) {
        yield put(loginActions.loginFailed({ error: new Error('Verify signature error') }));
        return;
    }

    if (!signatureVerified) {
        yield put(loginActions.loginFailed({ error: new Error('Verify signature failed') }));
        return;
    }

    const challengeAnswer = `${publicKey.toString()}|${bs58.encode(signature)}`;

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
        }),
    );
}

export function* loginSaga() {
    yield call(init);

    yield takeLatest(loginActions.loginWithPhantomWalletRequested.type, handleLoginWithPhantomWallet);
}
