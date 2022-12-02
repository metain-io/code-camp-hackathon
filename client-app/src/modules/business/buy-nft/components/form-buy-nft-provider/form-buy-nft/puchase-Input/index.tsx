import Image from '@app/layouts/admin-layout/navigation/components/image';
import React from 'react';
import { useFormBuyNft } from '../../use-form-buy-nft';
import styles from './styles.module.scss';

const PurchaseInput = () => {
    const { id } = useFormBuyNft();

    return (
        <div id={styles.preorder_input}>
            <div className={styles.input_block}>
                <p className={styles.input_block_label}>YOU BUY</p>
                <div className={styles.input_block_label_currency}>
                    <Image src="/svg/icon-vot-nft.svg" />
                    <span>{id} NFT</span>
                </div>
                <div>
                    <input inputMode="numeric" type={'number'} placeholder="0" />
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.input_block}>
                <p className={styles.input_block_label}>YOU PAY</p>
                <div className={[styles.input_block_label_currency, styles.flex_end].join(' ')}>
                    <select>
                        <option>USDT</option>
                        <option>USDC</option>
                    </select>
                </div>
                <div>
                    <input inputMode="numeric" type={'number'} placeholder="0" style={{ textAlign: 'right' }} />
                </div>
            </div>
        </div>
    );
};

export { PurchaseInput };
