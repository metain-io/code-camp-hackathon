import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components';
import React from 'react';

enum FormBuyNftStatus {
    Idle,
    Initializing,
    InitializeFailed,
    InitializeSucceeded,
    Processing,
    ProcessFailed,
    ProcessSucceeded,
}

enum FormBuyNftAction {
    InitRequested = 'INIT_REQUESTED',
    InitFailed = 'INIT_FAILED',
    InitSucceeded = 'INIT_SUCCEEDED',
    AmountNftChanged = 'AMOUNT_NFT_CHANGED',
    AmountTokenChanged = 'AMOUNT_TOKEN_CHANGED',
    SelectedTokenIndexChanged = 'SELECTED_TOKEN_INDEX_CHANGED',
    PurchaseNftRequested = 'PURCHASE_NFT_REQUESTED',
    PurchaseNftFailed = 'PURCHASE_NFT_FAILED',
    PurchaseNftSucceeded = 'PURCHASE_NFT_SUCCEEDED',
}

type FormBuyNftState = {
    status: FormBuyNftStatus;
    error: any;
    formData: {
        selectedTokenIndex: number;
        amountNft: string;
        amountToken: string;
    };
};

const selectableTokens = [
    {
        symbol: 'USDT',
        iconUrl: '/svg/icon-token-usdt.svg',
    },
    {
        symbol: 'USDC',
        iconUrl: '/svg/icon-token-usdc.svg',
    },
];

const initialState: FormBuyNftState = {
    status: FormBuyNftStatus.Idle,
    error: null,
    formData: {
        selectedTokenIndex: 0,
        amountNft: '',
        amountToken: '',
    },
};

const formBuyNftReducer = (state: FormBuyNftState, action: any) => {
    const { type, payload } = action;

    console.log(`handle ${type}`, payload);

    const handlers: any = {
        [FormBuyNftAction.InitRequested]: () => {
            state.status = FormBuyNftStatus.Initializing;
        },

        [FormBuyNftAction.InitFailed]: (payload: any) => {
            const { error } = payload;

            state.status = FormBuyNftStatus.InitializeFailed;
            state.error = error;
        },

        [FormBuyNftAction.InitSucceeded]: () => {
            state.status = FormBuyNftStatus.InitializeSucceeded;
        },

        [FormBuyNftAction.AmountNftChanged]: (payload: any) => {
            let { amountNft, amountToken } = payload;

            state.formData.amountNft = amountNft;
            state.formData.amountToken = amountToken;
        },

        [FormBuyNftAction.AmountTokenChanged]: (payload: any) => {
            const { amountToken, amountNft } = payload;

            state.formData.amountToken = amountToken;
            state.formData.amountNft = amountNft;
        },

        [FormBuyNftAction.SelectedTokenIndexChanged]: (payload: any) => {
            const { index } = payload;

            state.formData.selectedTokenIndex = index;
        },

        [FormBuyNftAction.PurchaseNftRequested]: () => {
            state.status = FormBuyNftStatus.Processing;
        },

        [FormBuyNftAction.PurchaseNftFailed]: (payload: any) => {
            const { error } = payload;

            state.status = FormBuyNftStatus.ProcessFailed;
            state.error = error;
        },

        [FormBuyNftAction.PurchaseNftSucceeded]: () => {
            state.status = FormBuyNftStatus.ProcessSucceeded;
        },
    };

    handlers[type]?.(payload);

    return { ...state };
};

const useFormBuyNft = () => {
    const [state, dispatch] = React.useReducer(formBuyNftReducer, initialState);

    React.useEffect(() => {
        dispatch({ type: FormBuyNftAction.InitRequested });

        setTimeout(() => {
            const random = Math.random() * 10;

            if (random > 5) {
                console.log('handlePurchaseNft succeeded');
                dispatch({ type: FormBuyNftAction.InitSucceeded });
            } else {
                console.log('handlePurchaseNft failed');
                dispatch({ type: FormBuyNftAction.InitFailed, payload: { error: 'Initialize Error' } });
            }
        }, 2000);
    }, []);

    const handleAmountNftChanged = (value: string) => {
        if (!value || isNaN(+value)) {
            dispatch({ type: FormBuyNftAction.AmountNftChanged, payload: { amountNft: value, amountToken: '' } });
            return;
        }

        const n = Math.floor(+value);
        dispatch({
            type: FormBuyNftAction.AmountNftChanged,
            payload: { amountNft: n.toString(), amountToken: (n * 10).toString() },
        });
    };

    const handleAmountTokenChanged = (value: string) => {
        if (!value || isNaN(+value)) {
            dispatch({ type: FormBuyNftAction.AmountTokenChanged, payload: { amountToken: value, amountNft: value } });
            return;
        }

        const n = Math.floor(+value / 10);
        dispatch({
            type: FormBuyNftAction.AmountTokenChanged,
            payload: { amountToken: value, amountNft: n.toString() },
        });
    };

    const handleSelectedTokenIndexChanged = (index: number) => {
        dispatch({ type: FormBuyNftAction.SelectedTokenIndexChanged, payload: { index } });
    };

    const handlePurchaseNft = () => {
        if (state.status == FormBuyNftStatus.InitializeFailed) {
            console.log('handlePurchaseNft form initialize failed');
            return;
        }
        dispatch({ type: FormBuyNftAction.PurchaseNftRequested });

        setTimeout(() => {
            const random = Math.random() * 10;

            if (random > 5) {
                console.log('handlePurchaseNft succeeded');
                dispatch({ type: FormBuyNftAction.PurchaseNftSucceeded });
            } else {
                console.log('handlePurchaseNft failed');
                dispatch({ type: FormBuyNftAction.PurchaseNftFailed, payload: { error: 'Purchase Error' } });
            }
        }, 2000);
    };

    return {
        ...state,

        selectableTokens,
        selectedToken:
            state.formData.selectedTokenIndex >= 0 ? selectableTokens[state.formData.selectedTokenIndex] : null,

        handleAmountNftChanged,
        handleAmountTokenChanged,
        handleSelectedTokenIndexChanged,
        handlePurchaseNft,
    };
};

export { useFormBuyNft, FormBuyNftStatus, FormBuyNftAction };
export type { FormBuyNftState };
