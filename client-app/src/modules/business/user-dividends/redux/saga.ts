import { claimDividend, getUserDividend } from '@api/metain/entry-points/hackathon';
import logger from '@libs/logger';
import { resolveGenerator } from '@libs/utils';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { userDividendActions } from './slice';

function* handleInitRequested(): any {
    const [response, error] = yield resolveGenerator(yield call(getUserDividend));

    if (error) {
        yield put(userDividendActions.initFailed({ error }));
        return;
    }

    if (response) {
        yield put(userDividendActions.initSucceeded({ data: response }));
    }
}

function* handleClaimDividendRequested(): any {
    const [response, error] = yield resolveGenerator(yield call(claimDividend));

    logger.info('saga/handleClaimDividendRequested', { response, error });
    if (error) {
        yield put(userDividendActions.claimDividendFailed({ error: 'Something went wrong.' }));
    }
    if (response) {
        yield put(userDividendActions.claimDividendSucceeded());
    }
}

export function* userDividendSaga() {
    yield takeLatest(userDividendActions.initRequested.type, handleInitRequested);
    yield takeLatest(userDividendActions.claimDividendRequested.type, handleClaimDividendRequested);
}
