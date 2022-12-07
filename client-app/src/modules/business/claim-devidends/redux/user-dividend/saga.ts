import { getUserDividend } from '@api/metain/entry-points/hackathon';
import { resolveGenerator } from '@libs/utils';
import { call, put, takeLatest } from 'redux-saga/effects';
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

export function* userDividendSaga() {
    yield takeLatest(userDividendActions.initRequested.type, handleInitRequested);
}
