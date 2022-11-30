import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';

const PageDashboard = () => {
    return (
        <div className="page-container">
            <h1 className="page-title">Welcome to METAIN Dashboard !!! </h1>
        </div>
    );
};

PageDashboard.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageDashboard;
