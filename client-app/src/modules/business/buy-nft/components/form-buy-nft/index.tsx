import Anchor from '@app/layouts/admin-layout/navigation/components/anchor';
import Image from '@app/layouts/admin-layout/navigation/components/image';
import { formatNumber } from '@libs/utils';
import { FormBuyNftProvider } from './form-buy-nft-provider';
import { useFormBuyNftContext } from './form-buy-nft-context';
import { ButtonPurchase } from './button-purchase';
import { BuyNftHistoryToggler } from './buy-nft-history-toggler';
import { PurchaseInput } from './puchase-Input';
import styles from './styles.module.scss';

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
    const { id, name } = useFormBuyNftContext();

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
                        <span className={styles.span_3}>- - US$/NFT</span>
                    </div>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>TOTAL SUPPLY</span>
                        <span className={styles.span_3}>- - NFT</span>
                    </div>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>SOLD</span>
                        <span className={styles.span_3}>- - NFT</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Body = () => {
    const { id, formData, selectedToken } = useFormBuyNftContext();

    return (
        <div id={styles.confirmorder_wrapper}>
            <PurchaseInput />

            <div className={styles.separator_1}></div>

            <div className={styles.div_3}>
                <span className={styles.span_1}>Wallet Balance:</span>
                <div className={styles.div_4}>
                    <span className={styles.block_span_4}>- - {selectedToken?.symbol || '- -'}</span>
                </div>
            </div>
            <div className={styles.div_2}>
                <span className={styles.span_4}>Amount NFT</span>
                <span className={styles.span_5}>
                    {(formData.amountNft && formatNumber(+formData.amountNft)) || '- -'} {id} NFT
                </span>

                <span className={styles.span_4}>NFT Price</span>
                <span className={styles.span_5}>- - US$</span>

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

export { FormBuyNft };
