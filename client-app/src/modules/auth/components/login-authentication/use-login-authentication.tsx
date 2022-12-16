import { LoginStatus, selectLoginStatus } from '@auth/redux/login/slice';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const PROTECTED_ROUTES = [
    '/',
    '/claim-dividends',
    '/dashboard',
    '/faucet-token',
    '/wallet',
    '/share-dividends',
    '/portfolios',
    '/portfolios/vot-1',
];

const AUTH_ROUTES = ['/login'];

const useLoginAuthentication = () => {
    const loginStatus = useSelector(selectLoginStatus);
    const router = useRouter();

    React.useEffect(() => {
        if (
            (loginStatus == LoginStatus.NotLogged ||
                loginStatus == LoginStatus.AuthenticateFailed ||
                loginStatus == LoginStatus.InitializeFailed) &&
            PROTECTED_ROUTES.includes(router.route)
        ) {
            if (router.route != '/') {
                router.replace('/login?redirectUrl=' + window.location.href);
            } else {
                router.replace('/login');
            }
            return;
        }

        if (loginStatus == LoginStatus.LoggedIn && AUTH_ROUTES.includes(router.route)) {
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

    const visibleChildren =
        !PROTECTED_ROUTES.includes(router.route) ||
        (PROTECTED_ROUTES.includes(router.route) && loginStatus == LoginStatus.LoggedIn);

    return { visibleChildren };
};

export { useLoginAuthentication };
