import { MainLayout } from '@app/layouts';
import type { AppProps } from 'next/app';
import '@app/styles/reset.scss';
import '@app/styles/default.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    );
}
