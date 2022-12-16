import { MouseEvent } from 'react';
import { useFormClaimDividends } from './use-form-claim-dividends';
import styles from './styles.module.scss';
import { UserDividendStatus } from '@business/user-dividends/redux/slice';
import WrappedBn from '@libs/wrapped-bn';

const FormClaimDividends = () => {
    const { status, userTotalUsdClaimableDividend, userTotalUsdClaimedDividend, handleClaimDividends } =
        useFormClaimDividends();
    const SOL_DECIMAL = WrappedBn.createFromNumber(Math.pow(10, 6));

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
                        <p>
                            {status == UserDividendStatus.Loading
                                ? '- -'
                                : status == UserDividendStatus.LoadingFailed
                                ? 'N/A'
                                : WrappedBn.div(WrappedBn.createFromNumber(userTotalUsdClaimableDividend || 0), SOL_DECIMAL)?.format(2, '', '.')}{' '}
                            US$
                        </p>
                    </div>

                    <div>
                        <p>Value (Claimed)</p>
                        <p>
                            {status == UserDividendStatus.Loading
                                ? '- -'
                                : status == UserDividendStatus.LoadingFailed
                                ? 'N/A'
                                : WrappedBn.div(WrappedBn.createFromNumber(userTotalUsdClaimedDividend || 0), SOL_DECIMAL)?.format(2, '', '.')}{' '}
                            US$
                        </p>
                    </div>

                    <div>
                        <button
                            className={[styles['button-claim-dividends'], 'mButton', 'mButton-cp5-bn1'].join(' ')}
                            onClick={onButtonClaimDividendsClicked}
                            disabled={
                                status == UserDividendStatus.Loading ||
                                status == UserDividendStatus.LoadingFailed ||
                                status == UserDividendStatus.ClaimingDividend ||
                                userTotalUsdClaimableDividend == 0
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
