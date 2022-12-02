import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import styles from './styles.module.scss';

const OtpDetailHighlightProperties = () => {
    const { highlightProperties } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div className={styles['otp-detail-highlight-properties']}>
            <div className={[styles.div_1].join(' ')}>
                {highlightProperties.map((value: any) => {
                    return (
                        <div
                            key={`Hightlight-${value.name}-${value.content}`}
                            className={[styles.item_1, value.content.includes('%') ? styles.percent : ''].join(' ')}
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
