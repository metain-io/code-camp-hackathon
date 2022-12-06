import CryptoWalletService from '@crypto-wallet/services/crypto-wallet-service';
import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components';
import * as anchor from '@project-serum/anchor';
import { getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js';
import React from 'react';
import { IDL } from '../../data/program-idls/offering-idl';
import { FormBuyNftAction, formBuyNftReducer, FormBuyNftState, FormBuyNftStatus } from './form-buy-nft-reducer';

const selectableTokens = [
    {
        symbol: 'USDT',
        iconUrl: '/svg/icon-token-usdt.svg',
    },
    {
        symbol: 'USDC',
        iconUrl: '/svg/icon-token-usdc.svg',
    },
];

const initialState: FormBuyNftState = {
    status: FormBuyNftStatus.Idle,
    error: null,
    formData: {
        selectedTokenIndex: 0,
        amountNft: '',
        amountToken: '',
    },
};

const useFormBuyNft = () => {
    const [state, dispatch] = React.useReducer(formBuyNftReducer, initialState);
    const { handleReloadData } = useOpportunityTrustPortfolioDetailContext();
    const [selectedTokenBalance, setSelectedTokenBalance] = React.useState<any>();

    const getSelectedTokenBalance = async () => {
        const selectedToken: { symbol: string; iconUrl: string } | null =
            (state.formData.selectedTokenIndex >= 0 && selectableTokens[state.formData.selectedTokenIndex]) || null;

        if (!selectedToken?.symbol || !CryptoWalletService.currentWallet?.walletAccount) {
            return null;
        }

        const balances = await CryptoWalletService.currentWallet?.getBalances(
            CryptoWalletService.currentWallet.walletAccount,
        );
        return balances[selectedToken?.symbol];
    };

    React.useEffect(() => {
        dispatch({ type: FormBuyNftAction.InitRequested });

        const init = async () => {};

        init()
            .then(() => {
                dispatch({ type: FormBuyNftAction.InitSucceeded });
            })
            .catch((error) => {
                dispatch({ type: FormBuyNftAction.InitFailed, payload: { error } });
            });
    }, []);

    React.useEffect(() => {
        if (state.status == FormBuyNftStatus.ProcessSucceeded) {
            getSelectedTokenBalance().then((tokenBalance) => setSelectedTokenBalance(tokenBalance));
            handleReloadData();
        }
    }, [state.status]);

    React.useEffect(() => {
        getSelectedTokenBalance().then((tokenBalance) => setSelectedTokenBalance(tokenBalance));
    }, [state.formData.selectedTokenIndex]);

    const handleAmountNftChanged = (value: string) => {
        if (!value || isNaN(+value)) {
            dispatch({ type: FormBuyNftAction.AmountNftChanged, payload: { amountNft: value, amountToken: '' } });
            return;
        }

        const n = Math.floor(+value);
        dispatch({
            type: FormBuyNftAction.AmountNftChanged,
            payload: { amountNft: n.toString(), amountToken: (n * 10).toString() },
        });
    };

    const handleAmountTokenChanged = (value: string) => {
        if (!value || isNaN(+value)) {
            dispatch({ type: FormBuyNftAction.AmountTokenChanged, payload: { amountToken: value, amountNft: value } });
            return;
        }

        const n = Math.floor(+value / 10);
        dispatch({
            type: FormBuyNftAction.AmountTokenChanged,
            payload: { amountToken: value, amountNft: n.toString() },
        });
    };

    const handleSelectedTokenIndexChanged = (index: number) => {
        dispatch({ type: FormBuyNftAction.SelectedTokenIndexChanged, payload: { index } });
    };

    const handlePurchaseNft = () => {
        if (state.status == FormBuyNftStatus.InitializeFailed) {
            console.log('handlePurchaseNft form initialize failed');
            return;
        }

        const getConnection = () => {
            const connection = new Connection(clusterApiUrl('devnet'));
            return connection;
        };

        const getPdaParams = async (
            programId: anchor.web3.PublicKey,
            baseUid: number,
            signer: anchor.web3.PublicKey,
            mintUSD: anchor.web3.PublicKey,
            mintNFT: anchor.web3.PublicKey,
        ): Promise<any> => {
            const uid = new anchor.BN(baseUid.toString());
            const uidBuffer = Buffer.from(uid.toArray('le', 8));

            let [statePubKey, stateBump] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from('state'), signer.toBuffer(), mintUSD.toBuffer(), mintNFT.toBuffer(), uidBuffer],
                programId,
            );
            let [walletPubKey, walletBump] = anchor.web3.PublicKey.findProgramAddressSync(
                [Buffer.from('wallet'), signer.toBuffer(), mintUSD.toBuffer(), mintNFT.toBuffer(), uidBuffer],
                programId,
            );

            return {
                stateBump,

                idx: uid,
                stateKey: statePubKey,
                escrowBump: walletBump,
                escrowWalletKey: walletPubKey,
            };
        };

        const purchaseNft = async () => {
            if (!CryptoWalletService?.currentWallet?.walletAccount) {
                return;
            }

            const TREASURY_ADDRESS = '621i9tL4tRBgt2PRbHynqSdYxPEd3KvpVkKX3chge3mU';
            const APPLICATION_IDX = 1670006191;
            const PROGRAM_ID = 'EbgwApfZNUQxGEqG2uJV5wkBVTZomp1ccDu7BuFsDKdY';

            const connection = getConnection();

            const mintUSDT = new PublicKey('A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr');
            const mintUSDC = new PublicKey('3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc');
            const mintVOT1 = new PublicKey('2nUTrUfTeucGLBqoW89rwiFZbwWAoGkYWhsLFWXUBM7h');

            const treasurerPublicKey = new PublicKey(TREASURY_ADDRESS);
            const walletPublicKey = new PublicKey(CryptoWalletService.currentWallet.walletAccount);
            const programPublicKey = new PublicKey(PROGRAM_ID);

            const program = new anchor.Program(IDL, PROGRAM_ID, (window as any).phantom?.solana);

            const bossWallet = Keypair.generate();

            const pda = await getPdaParams(programPublicKey, APPLICATION_IDX, treasurerPublicKey, mintUSDC, mintVOT1);

            const [buyerUsdWallet, treasurerUsdWallet, buyerNftWallet] = await Promise.all([
                getOrCreateAssociatedTokenAccount(connection, bossWallet, mintUSDC, walletPublicKey),
                getOrCreateAssociatedTokenAccount(connection, bossWallet, mintUSDC, treasurerPublicKey),
                getOrCreateAssociatedTokenAccount(connection, bossWallet, mintVOT1, walletPublicKey),
            ]);

            const transaction = await program.methods
                .buy(new anchor.BN(pda.idx), pda.stateBump, pda.escrowBump, new anchor.BN(state.formData.amountNft))
                .accounts({
                    applicationState: pda.stateKey,
                    escrowNftWalletState: pda.escrowWalletKey,
                    buyerUsdWallet: buyerUsdWallet.address,
                    treasurerUsdWallet: treasurerUsdWallet.address,
                    buyerNftWallet: buyerNftWallet.address,
                    buyer: walletPublicKey,
                    mintOfNft: mintVOT1,
                    mintOfUsd: mintUSDC,
                    treasurer: treasurerPublicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .signers([])
                .transaction();

            const latestBlockHash = await connection.getLatestBlockhash();

            transaction.recentBlockhash = latestBlockHash.blockhash;
            transaction.feePayer = walletPublicKey;

            const { signature } = await (window as any).phantom?.solana.signAndSendTransaction(transaction);

            const WAIT_TIME_LIMIT = 30 * 1000;
            let signatureStatus;
            let startTime = Date.now();
            do {
                signatureStatus = await connection.getSignatureStatus(signature);
            } while (
                signatureStatus.value?.confirmationStatus != 'finalized' &&
                Date.now() - startTime <= WAIT_TIME_LIMIT
            );
        };

        dispatch({ type: FormBuyNftAction.PurchaseNftRequested });

        purchaseNft()
            .then(() => {
                dispatch({ type: FormBuyNftAction.PurchaseNftSucceeded });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: FormBuyNftAction.PurchaseNftFailed, payload: { error: 'Purchase Error' } });
            });
    };

    return {
        ...state,

        selectableTokens,
        selectedToken:
            state.formData.selectedTokenIndex >= 0 ? selectableTokens[state.formData.selectedTokenIndex] : null,
        selectedTokenBalance,

        handleAmountNftChanged,
        handleAmountTokenChanged,
        handleSelectedTokenIndexChanged,
        handlePurchaseNft,
    };
};

export { useFormBuyNft };
