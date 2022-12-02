import React from 'react';

const MOCK_DATA = [
    {
        wallet: '0x123456789',
        date: new Date().toDateString(),
        NFTcount: 11,
        status: 'claimed',
    },
    {
        wallet: '0x123456789',
        date: new Date().toDateString(),
        NFTcount: 12,
        status: 'claimed',
    },
    {
        wallet: '0x123456789',
        date: new Date().toDateString(),
        NFTcount: 13,
        status: '',
    },
];

const useDividendHistory = () => {
    const [dividendHistory, setDividendHistory] = React.useState(MOCK_DATA);

    return {
        dividendHistory,
    };
};

export { useDividendHistory };
