import logger from '@libs/logger';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LoginStatus {
    Idle,
    Initializing,
    Authenticating,
    Failed,
    Logined,
}

type LoginState = {
    status: LoginStatus;
    error: any;
    username: string | null;
};

const initialState: LoginState = {
    status: LoginStatus.Idle,
    error: null,
    username: null,
};

export const loginSlice = createSlice({
    name: 'auth/login',
    initialState: initialState,
    reducers: {
        initRequested: (state) => {
            logger.info('auth/login/init-requested');

            state.status = LoginStatus.Initializing;
        },
        logoutRequested: (state) => {
            logger.info('auth/login/logout-requested');

            state.status = LoginStatus.Idle;
            state.error = null;
            state.username = null;
        },
        loginWithPhantomWalletRequested: (state) => {
            logger.info('auth/login/login-with-phantom-wallet-requested');

            state.status = LoginStatus.Authenticating;
            state.error = null;
            state.username = null;
        },
        loginSucceeded: (state, action: PayloadAction<any>) => {
            const { username } = action.payload;

            logger.info('auth/login/login-succeeded', { username });

            state.status = LoginStatus.Logined;
            state.username = username;
        },
        loginFailed: (state, action: PayloadAction<any>) => {
            const { error } = action.payload;

            logger.error('auth/login/login-failed', { error });

            state.status = LoginStatus.Failed;
            state.error = error;
        },
    },
    extraReducers: (builder) => {},
});

export const loginActions = loginSlice.actions;

export const loginReducers = loginSlice.reducer;

export const selectLoginStatus = (state: any) => state.login.status;
export const selectLoginError = (state: any) => state.login.error;
export const selectLoginUsername = (state: any) => state.login.username;
