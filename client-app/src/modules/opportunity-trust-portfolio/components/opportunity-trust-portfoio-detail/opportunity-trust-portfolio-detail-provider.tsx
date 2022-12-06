import React, { PropsWithChildren } from 'react';
import { OpportunityTrustPortfolioDetailContext } from './opportunity-trust-portfolio-detail-context';
import { useOpportunityTrustPortfolioDetail } from './use-opportunity-trust-portfolio-detail';

type OpportunityTrustPortfolioDetailProps = PropsWithChildren<{
    id?: string;
}>;

const OpportunityTrustPortfolioDetailProvider = (props: OpportunityTrustPortfolioDetailProps) => {
    const { id = 'VOT1', children } = props;

    const value = useOpportunityTrustPortfolioDetail(id);

    return (
        <OpportunityTrustPortfolioDetailContext.Provider value={value}>
            {children}
        </OpportunityTrustPortfolioDetailContext.Provider>
    );
};

export { OpportunityTrustPortfolioDetailProvider };
