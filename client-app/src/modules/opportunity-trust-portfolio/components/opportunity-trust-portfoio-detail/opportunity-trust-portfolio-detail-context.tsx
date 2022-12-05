import React from 'react';

type OpportunityTrustPortfolioDetailContextState = {
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
    saleInfo?: {
        nftTotalSupply: number;
        nftTotalRemaining: number;
        nftSold: number;
        nftPrice: number;
    };
};

const OpportunityTrustPortfolioDetailContext = React.createContext({} as OpportunityTrustPortfolioDetailContextState);

export { OpportunityTrustPortfolioDetailContext };
export const useOpportunityTrustPortfolioDetailContext = () => React.useContext(OpportunityTrustPortfolioDetailContext);
