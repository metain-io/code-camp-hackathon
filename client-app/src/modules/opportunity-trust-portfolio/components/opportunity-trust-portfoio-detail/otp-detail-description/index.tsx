import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import { OpportunityTrustPortfolioDetailStatus } from '../opportunity-trust-portfolio-detail-reducer';
import styles from './styles.module.scss';

const OtpDetailDescription = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    if (status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded) {
        return <></>;
    }

    return (
        <div className={styles['otp-detail-description']}>
            <span className={styles.span_2}>{data?.showcaseInfo.description}</span>
        </div>
    );
};

export { OtpDetailDescription };
