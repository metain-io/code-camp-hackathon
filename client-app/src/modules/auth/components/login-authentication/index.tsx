import { LoginStatus, selectLoginStatus } from '@auth/redux/login/slice';
import { useRouter } from 'next/router';
import React from 'react';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

type LoginAuthenticationProps = PropsWithChildren<{}>;

const LoginAuthentication = (props: LoginAuthenticationProps) => {
    const { children } = props;

    const loginStatus = useSelector(selectLoginStatus);
    const router = useRouter();

    React.useEffect(() => {
        if (loginStatus != LoginStatus.Logined && router.route != '/login') {
            router.replace('/login?redirectUrl=' + window.location.href);
            return;
        }

        if (loginStatus == LoginStatus.Logined) {
            const { redirectUrl } = router.query;

            if (redirectUrl) {
                router.replace(redirectUrl as string);
            } else {
                router.replace('/dashboard');
            }
            return;
        }
    }, [loginStatus]);

    if (loginStatus == LoginStatus.Logined || (loginStatus != LoginStatus.Logined && router.route == '/login')) {
        return <>{children}</>;
    }

    return null;
};

export { LoginAuthentication };
