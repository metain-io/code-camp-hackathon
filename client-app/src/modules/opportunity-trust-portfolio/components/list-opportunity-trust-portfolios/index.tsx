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
                                <span className={[styles.span_1, 'mTag'].join(' ')} data-status="income">
                                    Expected Income: {otp.expectedIncomePercent || '- -'}%
                                </span>
                            </div>
                            <div className={styles.div_2}>
                                <span className={styles.span_2}>
                                    {otp.id}: {otp.name}
                                </span>
                                <span className={styles.span_3}>Gross Rent</span>
                                <span className={styles.span_3}>Rent Per Token</span>
                                <span className={styles.span_4}>
                                    {(otp.grossRentPerYear && formatNumber(otp.grossRentPerYear)) || '- -'} US$/year
                                </span>
                                <span className={styles.span_4}>
                                    {(otp.rentPerTokenPerYear && formatNumber(otp.rentPerTokenPerYear)) || '- -'}{' '}
                                    US$/year
                                </span>
                            </div>
                            <div className={styles.div_3}>
                                <span className={styles.span_5}>Token Price</span>
                                <span className={styles.span_6}>{otp.pricePerToken || '- -'} US$</span>
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
