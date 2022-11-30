import { AdminLayout } from '@app/layouts';
import { FormClaimDividends } from '@business/claim-devidends/components';
import { ReactElement } from 'react';
import styles from './styles.module.scss';

const PageClaimDividends = () => {
    return (
        <div className={styles['container']}>
            <h1 className={styles['title']}>Claim Dividends</h1>

            <div className={styles['form-buy-nft-placeholder']}>
                <FormClaimDividends />
            </div>
        </div>
    );
};

PageClaimDividends.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageClaimDividends;
