import React from 'react';
import portfolios from '../../data/portfolios.json';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
const VOT1_NFT_MINT_ADDRESS = '2nUTrUfTeucGLBqoW89rwiFZbwWAoGkYWhsLFWXUBM7h';
const VOT1_POOL_ADDRESS = 'GY2s1kHZezBdCDg2BZakRJAxjage45MkCmAfTs9PaGkD';

const useOpportunityTrustPortfolioDetail = (id: string) => {
    const data = (portfolios as { [key: string]: any })[id];
    const [saleInfo, setSaleInfo] = React.useState<any>();

    React.useEffect(() => {
        const getConnection = () => {
            return new Connection(clusterApiUrl('devnet'));
        };

        const getNftTotalSupply = async () => {
            const connection = getConnection();
            const response = await connection.getTokenSupply(new PublicKey(VOT1_NFT_MINT_ADDRESS));
            const { value } = response;

            console.log('getNftTotalSupply', value.uiAmount);
            return value.uiAmount;
        };

        const getNftRemaining = async () => {
            const connection = getConnection();
            const response = await connection.getTokenAccountBalance(new PublicKey(VOT1_POOL_ADDRESS));

            const { value } = response;

            console.log('getNftRemain', value.uiAmount);
            return value.uiAmount;
        };

        Promise.all([getNftTotalSupply(), getNftRemaining()]).then((responses) => {
            const [nftTotalSupply, nftRemaining] = responses;

            if (!nftTotalSupply || !nftRemaining) {
                return;
            }

            setSaleInfo({
                nftTotalSupply,
                nftRemaining,
                nftSold: nftTotalSupply - nftRemaining,
                nftPrice: 10,
            });
        });
    }, []);

    return {
        ...data,
        saleInfo,
    };
};

export { useOpportunityTrustPortfolioDetail };
