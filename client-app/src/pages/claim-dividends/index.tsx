import { FormClaimDividends } from '@business/claim-devidends/components';
import styles from './styles.module.scss';

const PageClaimDividends = () => {
    return (
        <div className={['page-container', styles['container']].join(' ')}>
            <h1 className={['page-title', styles['title']].join(' ')}>Claim Dividends</h1>

            <div className={styles['form-buy-nft-placeholder']}>
                <FormClaimDividends />
            </div>
        </div>
    );
};

export default PageClaimDividends;
