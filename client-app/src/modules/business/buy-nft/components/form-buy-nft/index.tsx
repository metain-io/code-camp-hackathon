import Anchor from '@app/layouts/admin-layout/navigation/components/anchor';
import Image from '@app/layouts/admin-layout/navigation/components/image';
import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components/opportunity-trust-portfoio-detail-provider/opportunity-trust-portfolio-detail-context';
import { PurchaseInput } from './puchase-Input';
import styles from './styles.module.scss';

const FormBuyNft = () => {
    return (
        <div id={styles.preorder_container}>
            <div className={styles.inner_content}>
                <Header />
                <Body />
            </div>
        </div>
    );
};

const Header = () => {
    const { id, name } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles.header_wrapper}>
            <Image className={styles.image_1} src={'/image/vot/vot-1.png'} />

            <div className={styles.div_1}>
                <span className={styles.span_1}>PURCHASE</span>
                <Anchor href="/admin/vot/building/1" className={[styles.span_1].join(' ')}>
                    {`${id}: ${name}`}
                </Anchor>

                <div className={styles.div_2}>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>{id} NFT</span>
                        <span className={styles.span_3}>- - US$/NFT</span>
                    </div>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>Total Supply</span>
                        <span className={styles.span_3}>- - NFT</span>
                    </div>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>Sold</span>
                        <span className={styles.span_3}>- - NFT</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Body = () => {
    const { id } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles.confirmorder_wrapper}>
            <PurchaseInput />

            <div className={styles.separator_1}></div>

            <div className={styles.div_3}>
                <span className={styles.span_1}>Wallet Balance:</span>
                <div className={styles.div_4}>
                    <span className={styles.block_span_4}>- - USDT</span>
                </div>
            </div>
            <div className={styles.div_2}>
                <span className={styles.span_4}>Amount NFT</span>
                <span className={styles.span_5}>- - {id} NFT</span>

                <span className={styles.span_4}>NFT Price</span>
                <span className={styles.span_5}>- - US$</span>

                <>
                    <div className={styles.separator_2} />

                    <span className={[styles.span_4, styles.stressed].join(' ')}>Payment Total</span>
                    <span className={[styles.span_5, styles.stressed].join(' ')}>- - US$</span>
                </>
            </div>

            <button className={[styles.button_1, 'mButton mButton-cn1-bp6'].join(' ')}>PURCHASE</button>

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
