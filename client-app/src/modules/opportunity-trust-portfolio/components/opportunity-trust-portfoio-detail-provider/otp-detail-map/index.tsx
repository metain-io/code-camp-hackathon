import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import styles from './styles.module.scss';

const OtpDetailMap = () => {
    const { mapUrl } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div className={styles['otp-detail-map']}>
            <iframe src={mapUrl} width="100%" height="480px"></iframe>
        </div>
    );
};

export { OtpDetailMap };
