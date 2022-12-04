import Anchor from '@app/layouts/admin-layout/navigation/components/anchor';
import { useOpportunityTrustPortfolioDetailContext } from '../opportunity-trust-portfolio-detail-context';
import styles from './styles.module.scss';

const OtpDetailDocuments = () => {
    const { documents } = useOpportunityTrustPortfolioDetailContext();

    return (
        <div className={styles['otp-detail-documents']}>
            {documents.map((doc: any) => {
                const { name, href, disable } = doc;

                return (
                    <Anchor
                        key={`Document-${name}`}
                        href={disable ? '' : href}
                        className={styles['item']}
                        isOpenNewTab={href != '#' && href != ''}
                    >
                        <i className={[styles['item_icon'], 'fms fm-file-plus'].join(' ')}></i>
                        <span className={styles['item_label']}>{name}</span>
                    </Anchor>
                );
            })}
        </div>
    );
};

export { OtpDetailDocuments };
