import Anchor from '@app/layouts/admin-layout/navigation/components/anchor';
import Image from '@app/layouts/admin-layout/navigation/components/image';
import { formatNumber } from '@libs/utils';
import { FormBuyNftProvider } from './form-buy-nft-provider';
import { useFormBuyNftContext } from './form-buy-nft-context';
import { ButtonPurchase } from './button-purchase';
import { BuyNftHistoryToggler } from './buy-nft-history-toggler';
import { PurchaseInput } from './puchase-Input';
import styles from './styles.module.scss';
import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components';
import React from 'react';
import CryptoWalletService from '@crypto-wallet/services/crypto-wallet-service';

const FormBuyNft = () => {
    return (
        <FormBuyNftProvider>
            <div id={styles.preorder_container}>
                <div className={styles.inner_content}>
                    <Header />
                    <Body />
                </div>
            </div>
        </FormBuyNftProvider>
    );
};

const Header = () => {
    const { id, name, saleInfo } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles.header_wrapper}>
            <Image className={styles.image_1} src={'/image/vot/vot-1.png'} alt="" />

            <div className={styles.div_1}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                        <span className={styles.span_1}>PURCHASE</span>
                        <Anchor href="/admin/vot/building/1" className={[styles.span_1].join(' ')}>
                            {`${id}: ${name}`}
                        </Anchor>
                    </div>
                    <div>
                        <BuyNftHistoryToggler />
                    </div>
                </div>

                <div className={styles.div_2}>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>{id} NFT</span>
                        <span className={styles.span_3}>
                            {(saleInfo?.nftPrice && formatNumber(saleInfo.nftPrice)) || '- -'} US$/NFT
                        </span>
                    </div>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>TOTAL SUPPLY</span>
                        <span className={styles.span_3}>
                            {(saleInfo?.nftTotalSupply && formatNumber(saleInfo.nftTotalSupply)) || '- -'} NFT
                        </span>
                    </div>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>SOLD</span>
                        <span className={styles.span_3}>
                            {(saleInfo?.nftSold && formatNumber(saleInfo.nftSold)) || '- -'} NFT
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Body = () => {
    const { id, saleInfo } = useOpportunityTrustPortfolioDetailContext();
    const { formData, selectedToken } = useFormBuyNftContext();

    return (
        <div id={styles.confirmorder_wrapper}>
            <PurchaseInput />

            <div className={styles.separator_1}></div>

            <div className={styles.div_3}>
                <span className={styles.span_1}>Wallet Balance:</span>
                <TokenBalance />
            </div>
            <div className={styles.div_2}>
                <span className={styles.span_4}>Amount NFT</span>
                <span className={styles.span_5}>
                    {(formData.amountNft && formatNumber(+formData.amountNft)) || '- -'} {id} NFT
                </span>

                <span className={styles.span_4}>NFT Price</span>
                <span className={styles.span_5}>
                    {(saleInfo?.nftPrice && formatNumber(saleInfo.nftPrice)) || '- -'} US$
                </span>

                <>
                    <div className={styles.separator_2} />

                    <span className={[styles.span_4, styles.stressed].join(' ')}>Payment Total</span>
                    <span className={[styles.span_5, styles.stressed].join(' ')}>
                        {' '}
                        {(formData.amountNft && formatNumber(+formData.amountNft * 10)) || '- -'} US$
                    </span>
                </>
            </div>

            <div className={[styles.button_1].join(' ')}>
                <ButtonPurchase />
            </div>

            <span className={styles.span_6}>
                By using Metain App. You agree to{' '}
                <a href="https://metain.io/term-condition" target="_blank" rel="noreferrer">
                    Term and Conditions
                </a>
            </span>

            {/* <ModalInsufficientFund ref={modalInsufficientFundRef} requiredAmountUsd={totalAmountUsdPayment} /> */}
            {/* <BackdropSpinner active={isProcessing || fullPaymentEnabled === undefined} /> */}
        </div>
    );
};

const TokenBalance = () => {
    const { selectedToken } = useFormBuyNftContext();
    const [tokenBalance, setTokenBalance] = React.useState<any>();

    React.useEffect(() => {
        const getSelectedTokenBalance = async () => {
            if (!selectedToken?.symbol || !CryptoWalletService.currentWallet?.walletAccount) {
                return null;
            }

            const balances = await CryptoWalletService.currentWallet?.getBalances(
                CryptoWalletService.currentWallet.walletAccount,
            );
            return balances[selectedToken?.symbol];
        };

        getSelectedTokenBalance().then((tokenBalance) => setTokenBalance(tokenBalance));
    }, [selectedToken]);

    return (
        <div className={styles.div_4}>
            <span className={styles.block_span_4}>
                {tokenBalance?.toString() || ' - -'} {selectedToken?.symbol || '- -'}
            </span>
        </div>
    );
};

export { FormBuyNft };
