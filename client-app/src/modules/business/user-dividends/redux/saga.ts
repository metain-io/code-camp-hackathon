import { getUserDividend } from '@api/metain/entry-points/hackathon';
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
    const random = Math.random() * 10;

    yield delay(2000);

    if (random > 5) {
        yield put(userDividendActions.claimDividendSucceeded());
    } else {
        yield put(userDividendActions.claimDividendFailed({ error: 'Something went wrong' }));
    }
}

export function* userDividendSaga() {
    yield takeLatest(userDividendActions.initRequested.type, handleInitRequested);
    yield takeLatest(userDividendActions.claimDividendRequested.type, handleClaimDividendRequested);
}
