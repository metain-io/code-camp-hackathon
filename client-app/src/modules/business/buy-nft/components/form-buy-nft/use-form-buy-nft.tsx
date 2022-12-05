import { clusterApiUrl, Connection, Keypair, PublicKey, Signer } from '@solana/web3.js';
import React from 'react';
import * as anchor from '@project-serum/anchor';
import CryptoWalletService from '@crypto-wallet/services/crypto-wallet-service';
import { getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { IDL } from '../../data/program-idls/offering-idl';

enum FormBuyNftStatus {
    Idle,
    Initializing,
    InitializeFailed,
    InitializeSucceeded,
    Processing,
    ProcessFailed,
    ProcessSucceeded,
}

enum FormBuyNftAction {
    InitRequested = 'INIT_REQUESTED',
    InitFailed = 'INIT_FAILED',
    InitSucceeded = 'INIT_SUCCEEDED',
    AmountNftChanged = 'AMOUNT_NFT_CHANGED',
    AmountTokenChanged = 'AMOUNT_TOKEN_CHANGED',
    SelectedTokenIndexChanged = 'SELECTED_TOKEN_INDEX_CHANGED',
    PurchaseNftRequested = 'PURCHASE_NFT_REQUESTED',
    PurchaseNftFailed = 'PURCHASE_NFT_FAILED',
    PurchaseNftSucceeded = 'PURCHASE_NFT_SUCCEEDED',
}

type FormBuyNftState = {
    status: FormBuyNftStatus;
    error: any;
    formData: {
        selectedTokenIndex: number;
        amountNft: string;
        amountToken: string;
    };
};

const selectableTokens = [
    // {
    //     symbol: 'USDT',
    //     iconUrl: '/svg/icon-token-usdt.svg',
    // },
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

const formBuyNftReducer = (state: FormBuyNftState, action: any) => {
    const { type, payload } = action;

    console.log(`handle ${type}`, payload);

    const handlers: any = {
        [FormBuyNftAction.InitRequested]: () => {
            state.status = FormBuyNftStatus.Initializing;
        },

        [FormBuyNftAction.InitFailed]: (payload: any) => {
            const { error } = payload;

            state.status = FormBuyNftStatus.InitializeFailed;
            state.error = error;
        },

        [FormBuyNftAction.InitSucceeded]: () => {
            state.status = FormBuyNftStatus.InitializeSucceeded;
        },

        [FormBuyNftAction.AmountNftChanged]: (payload: any) => {
            let { amountNft, amountToken } = payload;

            state.formData.amountNft = amountNft;
            state.formData.amountToken = amountToken;
        },

        [FormBuyNftAction.AmountTokenChanged]: (payload: any) => {
            const { amountToken, amountNft } = payload;

            state.formData.amountToken = amountToken;
            state.formData.amountNft = amountNft;
        },

        [FormBuyNftAction.SelectedTokenIndexChanged]: (payload: any) => {
            const { index } = payload;

            state.formData.selectedTokenIndex = index;
        },

        [FormBuyNftAction.PurchaseNftRequested]: () => {
            state.status = FormBuyNftStatus.Processing;
        },

        [FormBuyNftAction.PurchaseNftFailed]: (payload: any) => {
            const { error } = payload;

            state.status = FormBuyNftStatus.ProcessFailed;
            state.error = error;
        },

        [FormBuyNftAction.PurchaseNftSucceeded]: () => {
            state.status = FormBuyNftStatus.ProcessSucceeded;
        },
    };

    handlers[type]?.(payload);

    return { ...state };
};

const useFormBuyNft = () => {
    const [state, dispatch] = React.useReducer(formBuyNftReducer, initialState);

    React.useEffect(() => {
        dispatch({ type: FormBuyNftAction.InitRequested });

        setTimeout(() => {
            const random = Math.random() * 10;

            // if (random > 5) {
            //     console.log('handlePurchaseNft succeeded');
            dispatch({ type: FormBuyNftAction.InitSucceeded });
            // } else {
            //     console.log('handlePurchaseNft failed');
            //     dispatch({ type: FormBuyNftAction.InitFailed, payload: { error: 'Initialize Error' } });
            // }
        }, 2000);
    }, []);

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

            // const bossWallet = Keypair.fromSecretKey(
            //     Uint8Array.from(bs58.decode(process.env.NEXT_PUBLIC_BOSS_WALLET_PRIVATE_KEY!)),
            // );

            const bossWallet = Keypair.generate();

            const pda = await getPdaParams(programPublicKey, APPLICATION_IDX, treasurerPublicKey, mintUSDC, mintVOT1);

            const [buyerUsdWallet, treasurerUsdWallet, buyerNftWallet] = await Promise.all([
                getOrCreateAssociatedTokenAccount(connection, bossWallet, mintUSDC, walletPublicKey),
                getOrCreateAssociatedTokenAccount(connection, bossWallet, mintUSDC, treasurerPublicKey),
                getOrCreateAssociatedTokenAccount(connection, bossWallet, mintVOT1, walletPublicKey),
            ]);

            const transaction = await program.methods
                .buy(new anchor.BN(pda.idx), pda.stateBump, pda.escrowBump, new anchor.BN(1))
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
                .signers([bossWallet])
                .transaction();

            const latestBlockHash = await connection.getLatestBlockhash();

            transaction.recentBlockhash = latestBlockHash.blockhash;
            transaction.feePayer = walletPublicKey;

            const { signature } = await (window as any).phantom?.solana.signAndSendTransaction(transaction);
            const signatureStatus = await connection.getSignatureStatus(signature);
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

        handleAmountNftChanged,
        handleAmountTokenChanged,
        handleSelectedTokenIndexChanged,
        handlePurchaseNft,
    };
};

export { useFormBuyNft, FormBuyNftStatus, FormBuyNftAction };
export type { FormBuyNftState };
