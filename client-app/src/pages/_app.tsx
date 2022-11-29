import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store as appStore } from '@app/redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/scss/main.scss';
import '@app/styles/animation.scss';
import '@app/styles/font-metain.scss';
import '@app/styles/rule.scss';
import '@app/styles/global.scss';
import { LoginAuthentication } from '@auth/components';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ReduxProvider store={appStore}>
            <LoginAuthentication>{getLayout(<Component {...pageProps} />)}</LoginAuthentication>
        </ReduxProvider>
    );
}
