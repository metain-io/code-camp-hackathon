import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum LoginStatus {
    Idle,
    Processing,
    Failed,
    Logined,
}

type LoginState = {
    status: LoginStatus;
    error: any;
    username?: string;
};

const initialState: LoginState = {
    status: LoginStatus.Idle,
    error: null,
    username: undefined,
};

export const loginSlice = createSlice({
    name: 'auth/login',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export const loginActions = loginSlice.actions;

export const loginReducers = loginSlice.reducer;

export const selectLoginStatus = (state: any) => state.login.status;
export const selectLoginError = (state: any) => state.login.error;
export const selectLoginUsername = (state: any) => state.login.username;
