import React from 'react';

const MOCK_DATA = [
    {
        date: new Date().toDateString(),
        amountDividends: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountDividends: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountDividends: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountDividends: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountDividends: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountDividends: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
];

const useClaimDividendsHistory = () => {
    const [claimDividendsHistory, setClaimDividendsHistory] = React.useState(MOCK_DATA);

    return {
        claimDividendsHistory,
    };
};

export { useClaimDividendsHistory };
