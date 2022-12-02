import Image from '@app/layouts/admin-layout/navigation/components/image';
import { useOpportunityTrustPortfolioDetailContext } from '@opportunity-trust-portfolio/components/opportunity-trust-portfoio-detail-provider/opportunity-trust-portfolio-detail-context';
import React from 'react';
import styles from './styles.module.scss';

const PurchaseInput = () => {
    const { id } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div id={styles.preorder_input}>
            <div className={styles.input_block}>
                <p className={styles.input_block_label}>YOU BUY</p>
                <div className={styles.input_block_label_currency}>
                    <Image src="/svg/icon-vot-nft.svg" />
                    <span>{id} NFT</span>
                </div>
                <div>
                    {/** input number */}
                    <input inputMode="numeric" type={'number'} />
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.input_block}>
                <p className={styles.input_block_label}>YOU PAY</p>
                <div className={[styles.input_block_label_currency, styles.flex_end].join(' ')}>
                    {/* select token */}
                    <select>
                        <option>USDT</option>
                        <option>USDC</option>
                    </select>
                </div>
                <div>
                    {/** input number */}
                    <input inputMode="numeric" type={'number'} />
                </div>
            </div>
        </div>
    );
};

export { PurchaseInput };
