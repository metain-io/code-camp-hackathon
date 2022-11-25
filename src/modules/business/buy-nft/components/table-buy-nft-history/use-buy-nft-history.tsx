import React from 'react';

const MOCK_DATA = [
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
    {
        date: new Date().toDateString(),
        amountSol: 10,
        amountNft: 1,
        transactionId: '21123112830182038012830819238012038912391028309khjhksadlasjdljasdkasdasd',
    },
];

const useBuyNftHistory = () => {
    const [buyNftHistory, setBuyNftHistory] = React.useState(MOCK_DATA);

    return {
        buyNftHistory,
    };
};

export { useBuyNftHistory };
