import logger from '@libs/logger';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AccountState = {
    tokenBalances: { [symbol: string]: TokenBalance };
    nftBalances: { [nftName: string]: NFTBalance };
};

export type TokenBalance = {
    amount: number | bigint;
    price: number;
};

export type NFTBalance = {
    amount: number | bigint;
    price: number;
};

const initialState: AccountState = {
    tokenBalances: {},
    nftBalances: {}
};

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        getTokenBalanceRequested: (state) => {
            logger.info('slice/account/getTokenBalanceRequested');
        },
        getTokenBalanceSucceed: (state, action: PayloadAction<any>) => {
            logger.info('slice/account/getTokenBalanceSucceed', action.payload);

            state.tokenBalances = action.payload
        },

        getNftBalanceRequested: (state) => {
            logger.info('slice/account/getNftBalanceRequested');
        },
        getNftBalanceSucceed: (state, action: PayloadAction<any>) => {
            logger.info('slice/account/getNftBalanceSucceed', action.payload);

            state.nftBalances = action.payload
        },
    },
    extraReducers: (builder) => {},
});

export const accountActions = accountSlice.actions;

export const accountReducers = accountSlice.reducer;

export const selectAccountTokenBalance = (state: any) => state.account.tokenBalances;
export const selectAccountNftBalance = (state: any) => state.account.nftBalances;
