import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components/opportunity-trust-portfoio-detail-provider/opportunity-trust-portfolio-detail-context';
import React from 'react';

const selectableTokens = ['USDT', 'USDC'];

const useFormBuyNft = () => {
    const { id, name } = useOpportunityTrustPortfolioDetailContext();
    const [amountNft, setAmountNft] = React.useState<number | undefined>(undefined);
    const [amountToken, setAmountToken] = React.useState<number | undefined>(undefined);
    const [selectedTokenIndex, setSelectedTokenIndex] = React.useState(-1);

    const handleAmountNftChanged = (value: string) => {
        console.log('handleAmountNftChanged', value);
    };

    const handleAmountTokenChanged = (value: string) => {
        console.log('handleAmountTokenChanged', value);
    };

    const handleSelectedTokenIndexChanged = (index: number) => {
        console.log('handleSelectedTokenIndexChanged', index);
    };

    const handlePurchaseNft = () => {
        console.log('handlePurchaseNft', {
            amountNft,
            amountToken,
            selectedToken: selectedTokenIndex > 0 ? selectableTokens[selectedTokenIndex] : null,
        });
    };

    return {
        id,
        name,
        amountNft,
        amountToken,
        selectableTokens,
        selectedTokenIndex,
        handleAmountNftChanged,
        handleAmountTokenChanged,
        handleSelectedTokenIndexChanged,
        handlePurchaseNft,
    };
};

export { useFormBuyNft };
