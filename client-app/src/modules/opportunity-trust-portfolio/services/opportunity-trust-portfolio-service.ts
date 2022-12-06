import portfolios from '../data/portfolios.json';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const VOT1_NFT_MINT_ADDRESS = process.env.NEXT_PUBLIC_MINT_NFT_ADDRESS || '';
const VOT1_POOL_ADDRESS = process.env.NEXT_PUBLIC_POOL_ADDRESS || '';

class OpportunityTrustPortfolioService {
    async getOtpShowcaseInfo(id: string) {
        const data = (portfolios as { [key: string]: any })[id];

        return data;
    }

    /***
     async getNftInfo() {
        try {
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            const NFT_ADDRESS = process.env.NEXT_PUBLIC_MINT_NFT_ADDRESS || '';
            const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS || '';
            const USDC_MINT_ADDRESS = process.env.NEXT_PUBLIC_MINT_USDC_ADDRESS || '';
            const APPLICATION_IDX = parseInt(process.env.NEXT_PUBLIC_TREASURY_ADDRESS || '0');
            const uid = new anchor.BN(APPLICATION_IDX.toString());

            const uidBuffer: any = uid.toArray("le", 8);
            let [escrowWalletPubKey, escrowWalletBump] = web3.PublicKey.findProgramAddressSync(
                [
                    Buffer.from('wallet'),
                    new web3.PublicKey(TREASURY_ADDRESS).toBuffer(),
                    new web3.PublicKey(USDC_MINT_ADDRESS).toBuffer(),
                    new web3.PublicKey(NFT_ADDRESS).toBuffer(),
                    uidBuffer,
                ],
                new web3.PublicKey(process.env.NEXT_PUBLIC_MINT_TRADE_PROGRAM_ADDRESS || ''),
            );
            const nftRemainSupply = await connection.getTokenAccountBalance(escrowWalletPubKey);
            const mintInfo = await SPL.getMint(connection, new web3.PublicKey(NFT_ADDRESS))
            // mintInfo.supply
            // minInfo.mintAuthority.toBase58()

            logger.debug('=== [PhantomWallet] - [getNftInfo] - [RS]: ', {
                mintInfo,
                mintInfoSupply: mintInfo.supply,
                remainingSupply: nftRemainSupply?.value.amount,
                walletPubKeyString: escrowWalletPubKey.toBase58(),  // => Get VOT1_POOL_ADDRESS
                escrowWalletBump
            });
        } catch (error: any) {
            logger.debug('=== [PhantomWallet] - [getNftInfo] - [ERROR]: ', error);
            return {};
        }
    }
    ***/

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
