import Image from '@app/layouts/admin-layout/navigation/components/image';
import { formatNumber } from '@libs/utils';
import {
    OpportunityTrustPortfolioDetailStatus,
    useOpportunityTrustPortfolioDetailContext,
} from '@opportunity-trust-portfolio/components';
import React, { FormEvent } from 'react';
import { ChangeEvent } from 'react';
import { useFormBuyNftContext } from '../form-buy-nft-context';
import styles from './styles.module.scss';

const PurchaseInput = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();
    const {
        selectableTokens,
        selectedToken,
        formData,
        handleAmountNftChanged,
        handleAmountTokenChanged,
        handleSelectedTokenIndexChanged,
    } = useFormBuyNftContext();

    const isInputingAmountNftRef = React.useRef(false);

    const onSelectTokenChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.value;
        handleSelectedTokenIndexChanged(+selectedIndex);
    };

    const onBeforeInputAmountNft = (e: FormEvent<HTMLInputElement>) => {
        isInputingAmountNftRef.current = true;
    };

    const onBeforeInputAmountToken = (e: FormEvent<HTMLInputElement>) => {
        isInputingAmountNftRef.current = false;
    };

    const onInputAmountNftChanged = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isInputingAmountNftRef.current) {
            return;
        }

        const value = e.target.value;
        handleAmountNftChanged(value);
    };

    const onInputAmountTokenChanged = (e: ChangeEvent<HTMLInputElement>) => {
        if (isInputingAmountNftRef.current) {
            return;
        }

        const value = e.target.value;
        handleAmountTokenChanged(value);
    };

    return (
        <div id={styles.preorder_input}>
            <div className={styles.input_block}>
                <p className={styles.input_block_label}>YOU BUY</p>
                <div className={styles.input_block_label_currency}>
                    <Image src="/svg/icon-vot-nft.svg" alt="" />
                    <span>{data?.showcaseInfo.id} NFT</span>
                </div>
                <div>
                    <input
                        inputMode="numeric"
                        type={'number'}
                        placeholder="0"
                        value={formData.amountNft}
                        onBeforeInput={onBeforeInputAmountNft}
                        onChange={onInputAmountNftChanged}
                    />

                    {formData.amountNft && (
                        <span className={styles['formatted']}>{formatNumber(+formData.amountNft)}</span>
                    )}
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.input_block}>
                <p className={styles.input_block_label}>YOU PAY</p>
                <div className={[styles.input_block_label_currency, styles.flex_end].join(' ')}>
                    <Image src={selectedToken?.iconUrl} alt="" />
                    <select onChange={onSelectTokenChanged}>
                        {selectableTokens.map((token: { symbol: string; iconUrl: string }, index: number) => {
                            return (
                                <option key={`token-${index}`} value={index}>
                                    {token.symbol}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <input
                        inputMode="numeric"
                        type={'number'}
                        placeholder="0"
                        value={formData.amountToken}
                        onBeforeInput={onBeforeInputAmountToken}
                        onChange={onInputAmountTokenChanged}
                        style={{ textAlign: 'right' }}
                    />
                    {formData.amountToken && (
                        <span className={styles['formatted']} style={{ textAlign: 'right' }}>
                            {formatNumber(+formData.amountToken)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export { PurchaseInput };
