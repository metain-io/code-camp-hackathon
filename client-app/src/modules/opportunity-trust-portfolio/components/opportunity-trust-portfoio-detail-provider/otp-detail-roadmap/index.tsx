import moment from 'moment';
import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import styles from './styles.module.scss';

const OtpDetailRoadmap = () => {
    const { roadmap } = useOpportunityTrustPortfolioDetailContext();
    const currentDate = moment();

    return (
        <div className={styles['otp-detail-roadmap']}>
            <div className={styles.div_1}>
                {roadmap.map((value: any, index: number) => {
                    const { title, timeLabel } = value;

                    let className = '';
                    let percent = 0;

                    const startDate = moment(value.startDate);
                    const endDate = moment(value.endDate);
                    const nextStartDate = roadmap[index + 1]?.startDate && moment(roadmap[index + 1]?.startDate);

                    if (currentDate >= startDate || currentDate >= endDate) {
                        className = styles.passed;
                    }

                    if (roadmap[index + 1] === undefined) {
                        className = styles.newest;
                    }

                    if (currentDate >= startDate && nextStartDate && currentDate < nextStartDate) {
                        className = styles.current;

                        const passedDay = currentDate.diff(startDate, 'days');
                        const remainDay = nextStartDate.diff(currentDate, 'days');

                        percent = (passedDay / (remainDay + passedDay)) * 100;
                    }

                    return (
                        <div
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
