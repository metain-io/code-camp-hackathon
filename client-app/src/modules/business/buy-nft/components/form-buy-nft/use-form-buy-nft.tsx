import CryptoWalletService from '@crypto-wallet/services/crypto-wallet-service';
import logger from '@libs/logger';
import {
    OpportunityTrustPortfolioDetailStatus,
    useOpportunityTrustPortfolioDetailContext,
} from '@opportunity-trust-portfolio/components';
import { useNotify } from '@shared/hooks';
import { accountActions } from 'modules/account/redux/slice';

import React from 'react';
import { useDispatch } from 'react-redux';
import { FormBuyNftAction, formBuyNftReducer, FormBuyNftState, FormBuyNftStatus } from './form-buy-nft-reducer';

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

const useFormBuyNft = () => {
    const [state, dispatch] = React.useReducer(formBuyNftReducer, initialState);
    const reduxDispatch = useDispatch();
    const {
        status: otpDetailStatus,
        data: otpDetailData,
        handleReloadData,
    } = useOpportunityTrustPortfolioDetailContext();
    const [selectedTokenBalance, setSelectedTokenBalance] = React.useState<any>();
    const { showToast } = useNotify();

    const getSelectedTokenBalance = async () => {
        const selectedToken: { symbol: string; iconUrl: string } | null =
            (state.formData.selectedTokenIndex >= 0 && selectableTokens[state.formData.selectedTokenIndex]) || null;

        if (!selectedToken?.symbol || !CryptoWalletService.currentWallet?.walletAccount) {
            return null;
        }

        const balances = await CryptoWalletService.currentWallet?.getBalances();
        return balances[selectedToken?.symbol];
    };

    React.useEffect(() => {
        dispatch({ type: FormBuyNftAction.InitRequested });

        const init = async () => {
            reduxDispatch(accountActions.getNftBalanceRequested());
        };

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

            showToast({ status: 'success', message: 'Purchase Success' });
        } else if (state.status == FormBuyNftStatus.ProcessFailed) {
            showToast({ status: 'error', message: state.error?.message || state.error?.toString() });
        }
    }, [state.status]);

    React.useEffect(() => {
        getSelectedTokenBalance().then((tokenBalance) => setSelectedTokenBalance(tokenBalance));
    }, [state.formData.selectedTokenIndex]);

    const handleAmountNftChanged = (value: string) => {
        if (otpDetailStatus != OpportunityTrustPortfolioDetailStatus.LoadSucceeded) {
            return;
        }

        if (!value || isNaN(+value)) {
            dispatch({ type: FormBuyNftAction.AmountNftChanged, payload: { amountNft: value, amountToken: '' } });
            return;
        }

        let n = Math.floor(+value);
        n = n > otpDetailData!.saleInfo.nftRemaining ? otpDetailData!.saleInfo.nftRemaining : n;

        dispatch({
            type: FormBuyNftAction.AmountNftChanged,
            payload: { amountNft: n.toString(), amountToken: (n * 10).toString() },
        });
    };

    const handleAmountTokenChanged = (value: string) => {
        if (otpDetailStatus != OpportunityTrustPortfolioDetailStatus.LoadSucceeded) {
            return;
        }

        if (!value || isNaN(+value)) {
            dispatch({ type: FormBuyNftAction.AmountTokenChanged, payload: { amountToken: value, amountNft: value } });
            return;
        }

        let n = Math.floor(+value / 10);
        n = n > otpDetailData!.saleInfo.nftRemaining ? otpDetailData!.saleInfo.nftRemaining : n;

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

        const purchaseNft = async () => {
            if (!CryptoWalletService?.currentWallet?.walletAccount) {
                throw new Error('Wallet is undefined');
            }

            if (!state.formData.amountNft || isNaN(+state.formData.amountNft)) {
                throw new Error('Amount is empty');
            }

            await CryptoWalletService.currentWallet.purchaseNft(+state.formData.amountNft);
        };

        dispatch({ type: FormBuyNftAction.PurchaseNftRequested });

        purchaseNft()
            .then(() => {
                dispatch({ type: FormBuyNftAction.PurchaseNftSucceeded });
            })
            .catch((error) => {
                logger.error('=== purchaseNft - ERROR ', error)
                if (error?.message == 'TokenAccountNotFoundError' || error == 'TokenAccountNotFoundError') {
                    error = 'Purchase failed. Please try again or contact to administrator for more detail.'
                }
                dispatch({ type: FormBuyNftAction.PurchaseNftFailed, payload: { error: error } });
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
