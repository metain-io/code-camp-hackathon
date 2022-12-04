import Image from '@app/layouts/admin-layout/navigation/components/image';
import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import styles from './styles.module.scss';

const OtpDetailPartners = () => {
    const { partnerResponsibilitiess } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div className={styles['otp-detail-partners']}>
            {partnerResponsibilitiess.map((value) => {
                const { name, partners } = value;

                return (
                    <div key={`Partner-${name}`} className={styles.item_1}>
                        <span className={styles.span_2}>{name}</span>
                        <div className={styles.div_1}>
                            {partners.map((value, index) => {
                                const { imageUrl, name: partnerName } = value;
                                return (
                                    <Image
                                        key={`partners-${partnerName}-${index}`}
                                        className={[styles.image_1, styles[`image_${partnerName}`]].join(' ')}
                                        src={imageUrl}
                                        alt={`Metain Partner ${name} ${partnerName}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export { OtpDetailPartners };
