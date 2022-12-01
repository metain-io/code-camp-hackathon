import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
// import styles from './styles.module.scss';

const PageOpportunityTrustPortfolio = () => {
    return (
        <div className="mBreadcrumb-style-4 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="div_1">
                <span className="span_1">VOT1: TDX Building</span>
                <span className="mTag span_2" data-status="successfull">
                    Total Return: Est 15-25% APY
                </span>
            </div>
        </div>
    );
};

PageOpportunityTrustPortfolio.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageOpportunityTrustPortfolio;
