import React from 'react';
import { OpportunityTrustPortfolioDetailState } from './opportunity-trust-portfolio-detail-reducer';

type OpportunityTrustPortfolioDetailContextState = OpportunityTrustPortfolioDetailState & {
    handleReloadData: () => void;
};

const OpportunityTrustPortfolioDetailContext = React.createContext({} as OpportunityTrustPortfolioDetailContextState);

export { OpportunityTrustPortfolioDetailContext };
export const useOpportunityTrustPortfolioDetailContext = () => React.useContext(OpportunityTrustPortfolioDetailContext);
