import { UserDividendHistoryItem } from '@api/metain/entry-points/hackathon';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum UserDividendStatus {
    Idle,
    Loading,
    LoadingFailed,
    LoadingSucceeded,
    ClaimingDividend,
    ClaimDividendFailed,
    ClaimDividendSucceeded,
}

type LoginState = {
    status: UserDividendStatus;
    error: any;
    data?: Array<UserDividendHistoryItem>;
};

const initialState: LoginState = {
    status: UserDividendStatus.Idle,
    error: null,
    data: undefined,
};

export const userDividendSlice = createSlice({
    name: 'business/user-dividend',
    initialState: initialState,
    reducers: {
        initRequested: (state) => {
            state.status = UserDividendStatus.Loading;
        },
        initFailed: (state, action: PayloadAction<any>) => {
            state.status = UserDividendStatus.LoadingFailed;
        },
        initSucceeded: (state, action: PayloadAction<any>) => {
            const { data } = action.payload;

            state.status = UserDividendStatus.LoadingSucceeded;
            state.data = data;
        },
        claimDividendRequested: (state) => {
            state.status = UserDividendStatus.ClaimingDividend;
        },
        claimDividendFailed: (state, action: PayloadAction<any>) => {
            const { error } = action.payload;

            state.status = UserDividendStatus.ClaimDividendFailed;
            state.error = error;
        },
        claimDividendSucceeded: (state) => {
            state.status = UserDividendStatus.ClaimDividendSucceeded;
        },
    },
});

export const userDividendActions = userDividendSlice.actions;

export const userDividendReducers = userDividendSlice.reducer;

export const selectUserDividendStatus = (state: any) => state.userDividend.status;
export const selectUserDividendError = (state: any) => state.userDividend.error;
export const selectUserDividendData = (state: any) => state.userDividend.data;
export const selectUserTotalUsdClaimableDividend = (state: any) => {
    return state.userDividend.data?.reduce((cur: number, prev: any) => {
        if (prev.status == 'available') {
            cur += prev.dividend;
        }

        return cur;
    }, 0);
};
export const selectUserTotalUsdClaimedDividend = (state: any) => {
    return state.userDividend.data?.reduce((cur: number, prev: any) => {
        if (prev.status == 'claimed') {
            cur += prev.dividend;
        }

        return cur;
    }, 0);
};
