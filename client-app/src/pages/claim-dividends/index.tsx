import { AdminLayout } from '@app/layouts';
import { FormClaimDividends, TableUserDividendHistory, TableUserDividends } from '@business/user-dividends/components';
import { TableUserDividendsStatistics } from '@business/user-dividends/components/table-user-dividends-statistics';
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

            <br />

            <h2 className={styles['title']}>User Dividends History - In detail</h2>

            <div className={styles['table-claim-dividends-history-placeholder']}>
                <TableUserDividendHistory />
            </div>

            <br />

            <h2 className={styles['title']}>User Dividends History - In detail</h2>

            <div className={styles['table-claim-dividends-history-placeholder']}>
                <TableUserDividendsStatistics />
            </div>
        </div>
    );
};

PageClaimDividends.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageClaimDividends;
