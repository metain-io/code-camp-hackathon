import { AdminLayout } from '@app/layouts';
import { ListOpportunityTrustPorfolios } from '@opportunity-trust-portfolio/components';
import { ReactElement } from 'react';
import styles from './styles.module.scss';

const PagePortfolios = () => {
    return (
        <div className={styles['container']}>
            <h1 className={styles['title']}>Opportunity Trust Portfolios</h1>

            <div id={styles.content_wrapper} className="mBlock">
                <ListOpportunityTrustPorfolios />
            </div>
        </div>
    );
};

PagePortfolios.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PagePortfolios;
