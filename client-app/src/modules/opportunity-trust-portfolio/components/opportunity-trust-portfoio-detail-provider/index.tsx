import React, { PropsWithChildren } from 'react';
import { OpportunityTrustPortfolioDetailContext } from './opportunity-trust-portfolio-detail-context';
import { useOpportunityTrustPortfolioDetail } from './use-opportunity-trust-portfolio-detail';

type OpportunityTrustPortfolioDetailProps = PropsWithChildren<{
    id?: string;
}>;

const OpportunityTrustPortfolioDetailProvider = (props: OpportunityTrustPortfolioDetailProps) => {
    const { id = 'VOT1', children } = props;

    const { data } = useOpportunityTrustPortfolioDetail(id);

    return (
        <OpportunityTrustPortfolioDetailContext.Provider value={data}>
            {children}
        </OpportunityTrustPortfolioDetailContext.Provider>
    );
};

export { OpportunityTrustPortfolioDetailProvider };
export * from './otp-detail-summary';
export * from './otp-detail-gallery';
export * from './otp-detail-partners';
export * from './otp-detail-documents';
export * from './otp-detail-description';
export * from './otp-detail-highlight-properties';
export * from './otp-detail-highlight-properties';
export * from './otp-detail-roadmap';
export * from './otp-detail-map';
