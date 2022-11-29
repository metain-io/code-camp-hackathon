import type { AppProps } from 'next/app';
import { SolanaWalletContextProvider } from '@auth/components';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/scss/main.scss';
import '@app/styles/animation.scss';
import '@app/styles/font-metain.scss';
import '@app/styles/rule.scss';
import '@app/styles/global.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return <SolanaWalletContextProvider>{getLayout(<Component {...pageProps} />)}</SolanaWalletContextProvider>;
}
