import { MainLayout } from '@app/layouts';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@app/styles/default.scss';
import '@app/styles/reset.scss';
import { SolanaWalletContextProvider } from '@auth/components';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SolanaWalletContextProvider>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </SolanaWalletContextProvider>
    );
}
