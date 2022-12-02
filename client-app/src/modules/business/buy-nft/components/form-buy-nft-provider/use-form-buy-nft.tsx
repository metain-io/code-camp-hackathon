import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components/opportunity-trust-portfoio-detail-provider/opportunity-trust-portfolio-detail-context';
import React from 'react';
import { FormBuyNftStatus } from './form-buy-nft-context';

const selectableTokens = [
    {
        symbol: 'USDT',
        iconUrl: '/svg/icon-token-usdt.svg',
        // value: 'A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr',
        // decimalNo: BigInt(Math.pow(10, 6)),
    },
    {
        symbol: 'USDC',
        iconUrl: '/svg/icon-token-usdc.svg',
        // value: '3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc',
        // decimalNo: BigInt(Math.pow(10, 6)),
    },
];

const useFormBuyNft = () => {
    const { id, name } = useOpportunityTrustPortfolioDetailContext();

    const [status, setStatus] = React.useState(FormBuyNftStatus.Idle);
    const [error, setError] = React.useState<any>(null);

    const [amountNft, setAmountNft] = React.useState<string>('');
    const [amountToken, setAmountToken] = React.useState<string>('');
    const [selectedTokenIndex, setSelectedTokenIndex] = React.useState(0);

    const handleAmountNftChanged = (value: string) => {
        console.log('handleAmountNftChanged', value);

        if (!value || isNaN(+value)) {
            setAmountNft(value);
            setAmountToken('');

            return;
        }

        const n = Math.floor(+value);
        setAmountNft(n.toString());
        setAmountToken((n * 10).toString());
    };

    const handleAmountTokenChanged = (value: string) => {
        console.log('handleAmountTokenChanged', value);

        setAmountToken(value);

        if (!value || isNaN(+value)) {
            setAmountNft('');
            return;
        }

        const n = Math.floor(+value / 10);
        setAmountNft(n.toString());
    };

    const handleSelectedTokenIndexChanged = (index: number) => {
        console.log('handleSelectedTokenIndexChanged', index);

        setSelectedTokenIndex(() => index);
    };

    const handlePurchaseNft = () => {
        console.log('handlePurchaseNft', {
            amountNft,
            amountToken,
            selectedToken: selectedTokenIndex >= 0 ? selectableTokens[selectedTokenIndex] : null,
        });

        setStatus(() => FormBuyNftStatus.Processing);

        setTimeout(() => {
            const random = Math.random() * 10;

            if (random > 5) {
                console.log('handlePurchaseNft succeeded');
                setStatus(() => FormBuyNftStatus.ProcessSucceeded);
            } else {
                console.log('handlePurchaseNft failed');
                setStatus(() => FormBuyNftStatus.ProcessFailed);
                setError(() => 'Something went wrong');
            }
        }, 2000);
    };

    return {
        status,
        error,

        id,
        name,

        amountNft,
        amountToken,
        selectableTokens,
        selectedTokenIndex,
        selectedToken: selectedTokenIndex >= 0 ? selectableTokens[selectedTokenIndex] : null,

        handleAmountNftChanged,
        handleAmountTokenChanged,
        handleSelectedTokenIndexChanged,
        handlePurchaseNft,
    };
};

export { useFormBuyNft };
