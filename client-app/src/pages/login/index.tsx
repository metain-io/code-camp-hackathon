import { AuthLayout } from '@app/layouts';
import { ButtonConnectPhantomWallet } from '@auth/components';
import { ReactElement } from 'react';
import styles from './styles.module.scss';

const PageLogin = () => {
    return (
        <div className={styles['page-container']}>
            <span className={styles['text-welcome']}>Hi, Welcome Back!</span>
            <div className={styles['button-connect-placeholder']}>
                <ButtonConnectPhantomWallet />
            </div>
        </div>
    );
};

PageLogin.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default PageLogin;
