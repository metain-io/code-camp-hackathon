import React from 'react';

const ShareDividend = () => {
    const [amountDevidend, setAmountDividend] = React.useState(0);

    const handleAmountDevidendChanged = (value: string) => {
        setAmountDividend(+value);
    };

    const handleShareDividend = () => {
        console.log(`[INFO] handleShareDividend`, { amountDevidend });
    };

    const handleNextDay = () => {
        console.log(`[INFO] handleNextDay`);
    };

    const handleReset = () => {
        console.log(`[INFO] handleReset`);
    };

    return {
        amountDevidend,
        handleAmountDevidendChanged,
        handleShareDividend,
        handleNextDay,
        handleReset,
    };
};

export { ShareDividend };
