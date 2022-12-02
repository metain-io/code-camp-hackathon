import { formatNumber2 } from '@libs/utils';
import moment from 'moment';
import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import styles from './styles.module.scss';

const OtpDetailSummary = () => {
    const { name, type, address, price, valuationDate, expectedNetRentalYield, expectedPropertyValueAppreciation } =
        useOpportunityTrustPortfolioDetailContext();

    return (
        <div className={styles['otp-detail-summary']}>
            <div className={styles.div_2}>
                <div className={styles.div_3}>
                    <span className={styles.span_4}>Target Raise</span>
                    <span className={styles.span_5}>{formatNumber2(price)} US$</span>
                    <span className={styles.span_6}>Valuation at {moment(valuationDate).format('DD MMMM YYYY')}</span>
                </div>
                <div className={[styles.div_3, styles.border_left].join(' ')}>
                    <span className={styles.span_7}>{expectedNetRentalYield}%</span>
                    <span className={styles.span_8}>Expected net rental yield</span>
                </div>
                <div className={styles.div_3}>
                    <span className={styles.span_7}>{expectedPropertyValueAppreciation}%</span>
                    <span className={styles.span_8}>Expected property value appreciation</span>
                </div>
            </div>
        </div>
    );
};

export { OtpDetailSummary };
