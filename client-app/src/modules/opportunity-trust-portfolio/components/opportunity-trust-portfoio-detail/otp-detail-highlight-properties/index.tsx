import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import { OpportunityTrustPortfolioDetailStatus } from '../opportunity-trust-portfolio-detail-reducer';
import styles from './styles.module.scss';

const OtpDetailHighlightProperties = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    return (
        <div className={styles['otp-detail-highlight-properties']}>
            <div className={[styles.div_1].join(' ')}>
                {hideContent
                    ? '- -'
                    : data?.showcaseInfo.highlightProperties &&
                      data?.showcaseInfo.highlightProperties.map((value: any) => {
                          return (
                              <div
                                  key={`Hightlight-${value.name}-${value.content}`}
                                  className={[styles.item_1, value.content.includes('%') ? styles.percent : ''].join(
                                      ' ',
                                  )}
                              >
                                  <span className={styles.span_5}>{value.name}</span>
                                  <span className={styles.span_6}>{value.content}</span>
                              </div>
                          );
                      })}
            </div>
        </div>
    );
};

export { OtpDetailHighlightProperties };
