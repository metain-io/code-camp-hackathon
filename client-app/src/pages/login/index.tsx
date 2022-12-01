import { AuthLayout } from '@app/layouts';
import { ButtonConnectPhantomWallet } from '@auth/components';
import { selectLoginError } from '@auth/redux/login/slice';
import { useNotify } from '@shared/hooks';
import React from 'react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const PageLogin = () => {
    const { showToast } = useNotify();
    const loginError = useSelector(selectLoginError);

    React.useEffect(() => {
        if (loginError) {
            showToast({
                status: 'error',
                message: loginError.message,
            });
        }
    }, [loginError]);

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
