import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { appSaga } from './saga';

import { loginReducers } from '@auth/redux/login/slice';
import { userDividendReducers } from '@business/claim-devidends/redux/user-dividend/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        login: loginReducers,
        userDividend: userDividendReducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(appSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
