import { MouseEvent } from 'react';
import { ClaimDividendsHistoryToggler } from './claim-dividends-history-toggler';
import styles from './styles.module.scss';
import { useClaimDividends } from './use-claim-dividends';

const FormClaimDividends = () => {
    const { amountNft, amountDividends, handleClaimDividends } = useClaimDividends();

    const onButtonClaimDividendsClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleClaimDividends();
    };

    return (
        <>
            <form className={[styles['form'], 'mBackground-style-1'].join(' ')}>
                {/* <div className={styles['form-header']}>
                    <label className={styles['form-title']}>Claim dividends to invest more NFT for future life!!</label>

                    <div>
                        <ClaimDividendsHistoryToggler />
                    </div>
                </div> */}

                <div className={styles['form-body']}>
                    <div>
                        <p>Available (Claimable)</p>
                        <p>{amountNft} US$</p>
                    </div>

                    <div>
                        <p>Value (Claimed)</p>
                        <p>{amountDividends} US$</p>
                    </div>

                    <div>
                        <button
                            className={[styles['button-claim-dividends'], 'mButton', 'mButton-cp5-bn1'].join(' ')}
                            onClick={onButtonClaimDividendsClicked}
                        >
                            Claim
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export { FormClaimDividends };
