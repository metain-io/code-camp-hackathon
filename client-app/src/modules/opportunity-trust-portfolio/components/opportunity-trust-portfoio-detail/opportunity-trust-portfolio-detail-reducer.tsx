enum OpportunityTrustPortfolioDetailAction {
    InitRequested = 'INIT_REQUESTED',
    InitFailed = 'INIT_FAILED',
    InitSucceeded = 'INIT_SUCCEEDED',
    ReloadRequested = 'RELOAD_REQUESTED',
    ReloadFailed = 'RELOAD_FAILED',
    ReloadSucceeded = 'RELOAD_SUCCEEDED',
}

enum OpportunityTrustPortfolioDetailStatus {
    Idle,
    Loading,
    LoadFailed,
    LoadSucceeded,
}

type OpportunityTrustPortfolioDetailState = {
    status: OpportunityTrustPortfolioDetailStatus;
    error: any;
    data?: {
        showcaseInfo: {
            id: string;
            name: string;
            type: string;
            address: string;
            price: number;
            targetRaise: number;
            valuationDate: number;
            expectedNetRentalYield: number;
            expectedPropertyValueAppreciation: number;
            holdingTimes: string;
            operateStatus: string;
            imageUrls: Array<string>;
            partnerResponsibilitiess: Array<{
                name: string;
                partners: Array<{
                    name: string;
                    imageUrl: string;
                }>;
            }>;
            documents: Array<{
                name: string;
                href: string;
            }>;
            description: string;
            highlightProperties: Array<{
                name: string;
                content: string;
            }>;
            roadmap: Array<{
                title: string;
                startDate: string;
                endDate: string;
                timeLabel: string;
            }>;
            mapUrl: string;
        };
        saleInfo: {
            nftTotalSupply: number;
            nftRemaining: number;
            nftSold: number;
            nftPrice: number;
        };
    };
};

const opportunityTrustPortfolioDetailReducer = (state: OpportunityTrustPortfolioDetailState, action: any) => {
    const { type, payload } = action;

    console.log(`handle ${type}`, payload);

    const handlers: any = {
        [OpportunityTrustPortfolioDetailAction.InitRequested]: () => {
            state.status = OpportunityTrustPortfolioDetailStatus.Loading;
        },
        [OpportunityTrustPortfolioDetailAction.InitFailed]: (payload: any) => {
            const { error } = payload;

            state.status = OpportunityTrustPortfolioDetailStatus.LoadFailed;
            state.error = error;
        },
        [OpportunityTrustPortfolioDetailAction.InitSucceeded]: (payload: any) => {
            const { data } = payload;

            state.status = OpportunityTrustPortfolioDetailStatus.LoadSucceeded;
            state.data = data;
        },
        [OpportunityTrustPortfolioDetailAction.ReloadRequested]: () => {
            state.status = OpportunityTrustPortfolioDetailStatus.Loading;
        },
        [OpportunityTrustPortfolioDetailAction.ReloadFailed]: () => {
            const { error } = payload;

            state.status = OpportunityTrustPortfolioDetailStatus.LoadFailed;
            state.error = error;
        },
        [OpportunityTrustPortfolioDetailAction.ReloadSucceeded]: () => {
            const { data } = payload;

            state.status = OpportunityTrustPortfolioDetailStatus.LoadSucceeded;
            state.data = data;
        },
    };

    handlers[type]?.(payload);

    return { ...state };
};

export {
    OpportunityTrustPortfolioDetailAction,
    OpportunityTrustPortfolioDetailStatus,
    opportunityTrustPortfolioDetailReducer,
};
export type { OpportunityTrustPortfolioDetailState };
