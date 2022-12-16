import portfolios from '../data/portfolios.json';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const VOT1_NFT_MINT_ADDRESS = process.env.NEXT_PUBLIC_MINT_NFT_ADDRESS || '';
const VOT1_POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS || '';

class OpportunityTrustPortfolioService {
    async getListOtp() {
        const otps: Array<any> = [];

        for (let id in portfolios) {
            otps.push((portfolios as any)[id]);
        }

        return otps;
    }

    async getOtpShowcaseInfo(id: string) {
        const data = (portfolios as { [key: string]: any })[id];

        return data;
    }

    async getOtpSaleInfo(
        id: string,
    ): Promise<{ nftTotalSupply: number; nftRemaining: number; nftSold: number; nftPrice: number } | null> {
        const getConnection = () => {
            return new Connection(clusterApiUrl('devnet'));
        };

        const getNftTotalSupply = async () => {
            const connection = getConnection();
            const response = await connection.getTokenSupply(new PublicKey(VOT1_NFT_MINT_ADDRESS));
            const { value } = response;

            return value.uiAmount;
        };

        const getNftRemaining = async () => {
            const connection = getConnection();
            const response = await connection.getTokenAccountBalance(new PublicKey(VOT1_POOL_ADDRESS));

            const { value } = response;

            return value.uiAmount;
        };

        const [nftTotalSupply, nftRemaining] = await Promise.all([getNftTotalSupply(), getNftRemaining()]);

        if (!nftTotalSupply || !nftRemaining) {
            return null;
        }

        const data = {
            nftTotalSupply,
            nftRemaining,
            nftSold: nftTotalSupply - nftRemaining,
            nftPrice: 10,
        };

        return data;
    }
}

const instance = new OpportunityTrustPortfolioService();
export { instance as OpportunityTrustPortfolioService };
