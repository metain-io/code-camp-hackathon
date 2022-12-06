import { OpportunityTrustPortfolioService } from '@opportunity-trust-portfolio/services/opportunity-trust-portfolio-service';
import React from 'react';
import {
    OpportunityTrustPortfolioDetailAction,
    opportunityTrustPortfolioDetailReducer,
    OpportunityTrustPortfolioDetailState,
    OpportunityTrustPortfolioDetailStatus,
} from './opportunity-trust-portfolio-detail-reducer';

const initialState: OpportunityTrustPortfolioDetailState = {
    status: OpportunityTrustPortfolioDetailStatus.Idle,
    error: null,
    data: undefined,
};

const useOpportunityTrustPortfolioDetail = (id: string) => {
    const [state, dispatch] = React.useReducer(opportunityTrustPortfolioDetailReducer, initialState);

    const loadData = async () => {
        const [showcaseInfo, saleInfo] = await Promise.all([
            OpportunityTrustPortfolioService.getOtpShowcaseInfo(id),
            OpportunityTrustPortfolioService.getOtpSaleInfo(id),
        ]);

        return [showcaseInfo, saleInfo];
    };

    React.useEffect(() => {
        dispatch({ type: OpportunityTrustPortfolioDetailAction.InitRequested });

        loadData()
            .then((result) => {
                const [showcaseInfo, saleInfo] = result;

                dispatch({
                    type: OpportunityTrustPortfolioDetailAction.InitSucceeded,
                    payload: { data: { showcaseInfo, saleInfo } },
                });
            })
            .catch((error) => {
                dispatch({
                    type: OpportunityTrustPortfolioDetailAction.InitFailed,
                    payload: { error },
                });
            });
    }, []);

    const handleReloadData = () => {
        dispatch({ type: OpportunityTrustPortfolioDetailAction.ReloadRequested });

        loadData()
            .then((result) => {
                const [showcaseInfo, saleInfo] = result;

                dispatch({
                    type: OpportunityTrustPortfolioDetailAction.ReloadSucceeded,
                    payload: { data: { showcaseInfo, saleInfo } },
                });
            })
            .catch((error) => {
                dispatch({
                    type: OpportunityTrustPortfolioDetailAction.ReloadFailed,
                    payload: { error },
                });
            });
    };

    return {
        ...state,

        handleReloadData,
    };
};

export { useOpportunityTrustPortfolioDetail };
