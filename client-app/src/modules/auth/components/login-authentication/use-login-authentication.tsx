import { LoginStatus, selectLoginStatus } from '@auth/redux/login/slice';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const PUBLIC_ROUTES = ['/login', '/404'];

const useLoginAuthentication = () => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStatus]);

    const canShowChildren =
        loginStatus == LoginStatus.Logined ||
        (loginStatus != LoginStatus.Logined && PUBLIC_ROUTES.includes(router.route));

    return { canShowChildren };
};

export { useLoginAuthentication };
