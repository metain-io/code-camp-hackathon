import { AdminLayout } from '@app/layouts';
import { FormClaimDividends, TableUserDividends } from '@business/user-dividends/components';
import { ReactElement } from 'react';
import styles from './styles.module.scss';

const PageClaimDividends = () => {
    return (
        <div className={styles['container']}>
            <h2 className={styles['title']}>Claim Dividends</h2>

            <div className={styles['form-buy-nft-placeholder']} style={{ marginBottom: '30px' }}>
                <FormClaimDividends />
            </div>

            <h2 className={styles['title']}>Claim Dividends History</h2>

            <div className={styles['table-claim-dividends-history-placeholder']}>
                <TableUserDividends />
            </div>
        </div>
    );
};

PageClaimDividends.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageClaimDividends;
