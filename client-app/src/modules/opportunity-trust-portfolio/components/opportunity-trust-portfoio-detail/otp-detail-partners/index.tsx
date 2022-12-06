import Image from '@app/layouts/admin-layout/navigation/components/image';
import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import { OpportunityTrustPortfolioDetailStatus } from '../opportunity-trust-portfolio-detail-reducer';
import styles from './styles.module.scss';

const OtpDetailPartners = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    return (
        <div className={styles['otp-detail-partners']}>
            {hideContent
                ? '- -'
                : data?.showcaseInfo.partnerResponsibilitiess &&
                  data?.showcaseInfo.partnerResponsibilitiess.map((value) => {
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
