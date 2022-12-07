import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { appSaga } from './saga';

import { loginReducers } from '@auth/redux/login/slice';
import { accountReducers } from 'modules/account/redux/slice';
import { userDividendReducers } from '@business/user-dividends/redux/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        login: loginReducers,
        userDividend: userDividendReducers,
        account: accountReducers
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(appSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
