import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import styles from './styles.module.scss';

const OtpDetailDescription = () => {
    const { description } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div className={styles['otp-detail-description']}>
            <span className={styles.span_2}>{description}</span>
        </div>
    );
};

export { OtpDetailDescription };
