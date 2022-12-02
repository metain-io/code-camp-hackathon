import React from 'react';

const useBuyNft = () => {
    const [amountSol, setAmountSol] = React.useState(0);
    const [amountNft, setAmountNft] = React.useState(0);

    const handleAmountSolChanged = (value: string) => {
        setAmountSol(+value);
    };

    const handleAmountNftChanged = (value: string) => {
        setAmountNft(+value);
    };

    const handleBuyNft = () => {
        console.log(`handle buy nft`, { amountSol, amountNft });
    };

    return {
        amountSol,
        amountNft,
        handleAmountSolChanged,
        handleAmountNftChanged,
        handleBuyNft,
    };
};

export { useBuyNft };
