import moment from 'moment';
import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import { OpportunityTrustPortfolioDetailStatus } from '../opportunity-trust-portfolio-detail-reducer';
import styles from './styles.module.scss';

const OtpDetailRoadmap = () => {
    const { status, data } = useOpportunityTrustPortfolioDetailContext();

    const hideContent = status != OpportunityTrustPortfolioDetailStatus.LoadSucceeded;

    const currentDate = moment();

    return (
        <div className={styles['otp-detail-roadmap']}>
            <div className={styles.div_1}>
                {hideContent
                    ? '- -'
                    : data?.showcaseInfo.roadmap.map((value: any, index: number) => {
                          const { title, timeLabel } = value;

                          let className = '';
                          let percent = 0;

                          if (value.startDate === value.endDate) {
                              if (currentDate >= moment(value.startDate)) {
                                  className = styles.passed;
                              }
                          } else {
                              if (
                                  (currentDate <= moment(value.endDate) && currentDate >= moment(value.startDate)) ||
                                  currentDate >= moment(value.endDate)
                              ) {
                                  className = styles.passed;
                              }
                          }

                          if (className === styles.passed) {
                              if (data?.showcaseInfo.roadmap[index + 1] === undefined) {
                                  className = styles.newest;
                              } else if (
                                  currentDate >= moment(value.startDate) &&
                                  currentDate < moment(data?.showcaseInfo.roadmap[index + 1].startDate)
                              ) {
                                  className = styles.current;

                                  const passedDay = currentDate.diff(moment(value.startDate), 'days');
                                  const remainDay = moment(data?.showcaseInfo.roadmap[index + 1].startDate).diff(
                                      currentDate,
                                      'days',
                                  );

                                  percent = (passedDay / (remainDay + passedDay)) * 100;
                              }
                          }

                          return (
                              <div
                                  key={`roadmap-node-${title}-${index}`}
                                  className={[styles.item_1, className].join(' ')}
                                  style={{ '--percent': `${percent}%` } as React.CSSProperties}
                              >
                                  <span className={styles.span_4}></span>
                                  <span className={styles.span_2}>{title}</span>
                                  <span className={styles.span_3}>{timeLabel}</span>
                              </div>
                          );
                      })}
            </div>
        </div>
    );
};

export { OtpDetailRoadmap };
