import { MouseEvent } from 'react';
import { useFormClaimDividends } from './use-form-claim-dividends';
import styles from './styles.module.scss';
import { UserDividendStatus } from '@business/user-dividends/redux/slice';

const FormClaimDividends = () => {
    const { status, userTotalUsdClaimableDividend, userTotalUsdClaimedDividend, handleClaimDividends } =
        useFormClaimDividends();

    const onButtonClaimDividendsClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleClaimDividends();
    };

    return (
        <>
            <form className={[styles['form'], 'mBackground-style-1'].join(' ')}>
                <div className={styles['form-body']}>
                    <div>
                        <p>Available (Claimable)</p>
                        <p>{status == UserDividendStatus.Loading ? '- -' : userTotalUsdClaimableDividend} US$</p>
                    </div>

                    <div>
                        <p>Value (Claimed)</p>
                        <p>{status == UserDividendStatus.Loading ? '- -' : userTotalUsdClaimedDividend} US$</p>
                    </div>

                    <div>
                        <button
                            className={[styles['button-claim-dividends'], 'mButton', 'mButton-cp5-bn1'].join(' ')}
                            onClick={onButtonClaimDividendsClicked}
                            disabled={
                                status == UserDividendStatus.Loading || status == UserDividendStatus.ClaimingDividend
                            }
                        >
                            {status == UserDividendStatus.Loading
                                ? 'Loading...'
                                : status == UserDividendStatus.ClaimingDividend
                                ? 'Processing...'
                                : 'Claim'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export { FormClaimDividends };
