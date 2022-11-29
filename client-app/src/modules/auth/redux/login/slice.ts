import logger from '@libs/logger';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LoginStatus {
    Undefined,
    Initializing,
    InitializeFailed,
    Authenticating,
    AuthenticateFailed,
    NotLogged,
    LoggedIn,
}

type LoginState = {
    status: LoginStatus;
    error: any;
    username: string | null;
};

const initialState: LoginState = {
    status: LoginStatus.Undefined,
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
        initFinished: (state, action: PayloadAction<any>) => {
            const { status, username } = action.payload;

            logger.info('auth/login/init-finished');

            state.status = status;
            state.username = username;
        },
        initFailed: (state, action: PayloadAction<any>) => {
            const { error } = action.payload;

            logger.error('auth/login/init-failed', { error });

            state.status = LoginStatus.InitializeFailed;
            state.error = error;
        },
        logoutRequested: (state) => {
            logger.info('auth/login/logout-requested');

            state.status = LoginStatus.NotLogged;
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

            state.status = LoginStatus.LoggedIn;
            state.username = username;
        },
        loginFailed: (state, action: PayloadAction<any>) => {
            const { error } = action.payload;

            logger.error('auth/login/login-failed', { error });

            state.status = LoginStatus.AuthenticateFailed;
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
