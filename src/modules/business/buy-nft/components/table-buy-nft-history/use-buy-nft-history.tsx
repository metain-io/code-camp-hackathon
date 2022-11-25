import React from 'react';

const useBuyNftHistory = () => {
    const [buyNftHistory, setBuyNftHistory] = React.useState([]);

    return {
        buyNftHistory,
    };
};

export { useBuyNftHistory };
