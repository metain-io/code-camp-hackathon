import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';

const PagePortfolios = () => {
    return <>Portfolios</>;
};

PagePortfolios.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PagePortfolios;
