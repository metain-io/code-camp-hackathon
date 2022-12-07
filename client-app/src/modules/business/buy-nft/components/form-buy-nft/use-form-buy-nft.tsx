import CryptoWalletService from '@crypto-wallet/services/crypto-wallet-service';
import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components';
import { useNotify } from '@shared/hooks';

import React from 'react';
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
    const { handleReloadData } = useOpportunityTrustPortfolioDetailContext();
    const [selectedTokenBalance, setSelectedTokenBalance] = React.useState<any>();
    const { showToast } = useNotify();

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

            showToast({ status: 'success', message: 'Purchase Success' });
        } else if (state.status == FormBuyNftStatus.ProcessFailed) {
            showToast({ status: 'error', message: state.error?.message || state.error?.toString() });
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
