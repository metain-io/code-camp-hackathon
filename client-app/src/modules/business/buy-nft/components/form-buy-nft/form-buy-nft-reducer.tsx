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

enum FormBuyNftStatus {
    Idle,
    Initializing,
    InitializeFailed,
    InitializeSucceeded,
    Processing,
    ProcessFailed,
    ProcessSucceeded,
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

export { FormBuyNftAction, FormBuyNftStatus, formBuyNftReducer };
export type { FormBuyNftState };
