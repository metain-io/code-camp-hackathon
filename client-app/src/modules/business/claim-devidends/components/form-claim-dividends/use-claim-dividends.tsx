import React from 'react';

const useClaimDividends = () => {
    const [amountDividends] = React.useState(0);
    const [amountNft] = React.useState(0);

    const handleClaimDividends = () => {
        console.log(`handle buy nft`, { amountDividends, amountNft });
    };

    return {
        amountDividends,
        amountNft,
        handleClaimDividends,
    };
};

export { useClaimDividends };
