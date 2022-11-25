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
            <form className={styles['form']}>
                <div className={styles['form-header']}>
                    <label className={styles['form-title']}>Claim dividends to invest more NFT for future life!!</label>

                    <div>
                        <ClaimDividendsHistoryToggler />
                    </div>
                </div>

                <div className={styles['form-group']}>
                    <p>Amount NFT You Have: {amountNft}</p>
                    <p>Amount Dividends You Receive: {amountDividends}</p>
                </div>

                <button onClick={onButtonClaimDividendsClicked}>Claim</button>
            </form>
        </>
    );
};

export { FormClaimDividends };
