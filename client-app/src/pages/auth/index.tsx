import { AuthLayout } from '@app/layouts';
import { ReactElement } from 'react';

const PageAuth = () => {
    return (
        <div>
            <button>Connect Phantom Wallet</button>
        </div>
    );
};

PageAuth.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default PageAuth;
