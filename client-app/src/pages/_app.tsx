import { MainLayout } from '@app/layouts';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/scss/main.scss';
import '@app/styles/default.scss';
import '@app/styles/reset.scss';
import '@app/styles/animation.scss';
import '@app/styles/font-metain.scss';
import '@app/styles/rule.scss';
import '@app/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        // <MainLayout>
            <Component {...pageProps} />
        // </MainLayout>
    );
}
