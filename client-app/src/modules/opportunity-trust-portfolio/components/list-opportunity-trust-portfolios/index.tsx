import Image from '@app/layouts/admin-layout/navigation/components/image';
import { formatNumber } from '@libs/utils';
import styles from './styles.module.scss';
import { useListOpportunityTrustPortfolios } from './use-list-opportunity-trust-portfolios';

const ListOpportunityTrustPorfolios = () => {
    const { otps, handleItemClicked } = useListOpportunityTrustPortfolios();

    const onItemClicked = (otp: any) => {
        handleItemClicked(otp);
    };

    return (
        <>
            <div id={styles.content_wrapper}>
                {otps.map((otp: any) => {
                    const otpDisabled = otp.operateStatus != 'Operating';

                    return (
                        <div key={otp.id} className={[styles.item_1, otpDisabled ? styles.disabled : ''].join(' ')}>
                            <div className={styles.div_1}>
                                <Image src={otp.imageUrls[0]} className={styles.image_1} alt="" />
                                <span
                                    className={[styles.span_1, 'mTag'].join(' ')}
                                    data-status={otpDisabled ? '' : 'income'}
                                >
                                    Expected Income:{' '}
                                    {(!otpDisabled &&
                                        otp.expectedIncomePercent &&
                                        `${formatNumber(otp.expectedIncomePercent)}%`) ||
                                        'Coming Soon'}
                                </span>
                            </div>
                            <div className={styles.div_2}>
                                <span className={styles.span_2}>
                                    {otp.id}: {otp.name}
                                </span>
                                <span className={styles.span_3}>Gross Rent</span>
                                <span className={styles.span_3}>Rent Per Token</span>
                                <span className={styles.span_4}>
                                    {(!otpDisabled &&
                                        otp.grossRentPerYear &&
                                        `${formatNumber(otp.grossRentPerYear)} US$/year`) ||
                                        'Coming Soon'}
                                </span>
                                <span className={styles.span_4}>
                                    {(!otpDisabled &&
                                        otp.rentPerTokenPerYear &&
                                        `${formatNumber(otp.rentPerTokenPerYear)} US$/year`) ||
                                        'Coming Soon'}
                                </span>
                            </div>
                            <div className={styles.div_3}>
                                <span className={styles.span_5}>Token Price</span>
                                <span className={styles.span_6}>
                                    {(!otpDisabled && otp.pricePerToken && `${formatNumber(otp.pricePerToken)} US$`) ||
                                        'Coming Soon'}
                                </span>
                                <button
                                    className={[styles.button_1, 'mButton mButton-cn1-bp6'].join(' ')}
                                    disabled={otpDisabled}
                                    onClick={() => {
                                        onItemClicked(otp);
                                    }}
                                >
                                    {otpDisabled ? 'Coming Soon' : 'Go To Buy'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export { ListOpportunityTrustPorfolios };
