import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { PropsWithChildren } from 'react';

type SolanaWalletContextProviderProps = PropsWithChildren<{}>;

const endpoint = clusterApiUrl('devnet');
const wallets = [new PhantomWalletAdapter()];

const SolanaWalletContextProvider = (props: SolanaWalletContextProviderProps) => {
    const { children } = props;

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export { SolanaWalletContextProvider };
