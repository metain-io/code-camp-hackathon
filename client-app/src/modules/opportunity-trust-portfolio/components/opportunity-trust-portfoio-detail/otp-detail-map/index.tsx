import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import { OpportunityTrustPortfolioDetailStatus } from '../opportunity-trust-portfolio-detail-reducer';
import styles from './styles.module.scss';

const OtpDetailMap = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    return (
        <div className={styles['otp-detail-map']}>
            {hideContent ? '- -' : <iframe src={data?.showcaseInfo.mapUrl} width="100%" height="480px"></iframe>}
        </div>
    );
};

export { OtpDetailMap };
