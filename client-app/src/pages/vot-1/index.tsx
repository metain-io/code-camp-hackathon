import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
// import styles from './styles.module.scss';

const PageOpportunityTrustPortfolio = () => {
    return (
        // <div className={styles['container']}>
        // <h2 className={styles['title']}>VOT1...</h2>
        // </div>
        <></>
    );
};

PageOpportunityTrustPortfolio.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageOpportunityTrustPortfolio;
