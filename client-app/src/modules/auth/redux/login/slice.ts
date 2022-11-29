import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum LoginStatus {
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
            state.status = LoginStatus.Initializing;
        },
        logoutRequested: (state) => {
            state.status = LoginStatus.Idle;
            state.error = null;
            state.username = null;
        },
        loginWithPhantomWalletRequested: (state) => {
            state.status = LoginStatus.Authenticating;
            state.error = null;
            state.username = null;
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            const { username } = action.payload;
            state.status = LoginStatus.Logined;
            state.username = username;
        },
        loginFailed: (state, action: PayloadAction<any>) => {
            const { error } = action.payload;
            console.log('login-failed', { error });
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
