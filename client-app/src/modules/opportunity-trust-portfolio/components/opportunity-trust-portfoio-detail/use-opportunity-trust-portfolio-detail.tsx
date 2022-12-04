import portfolios from '../../data/portfolios.json';

const useOpportunityTrustPortfolioDetail = (id: string) => {
    const data = (portfolios as { [key: string]: any })[id];

    return {
        data,
    };
};

export { useOpportunityTrustPortfolioDetail };
