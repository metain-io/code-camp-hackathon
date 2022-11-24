import { NavigationBar } from '@app/components';
import { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

type MainLayoutProps = PropsWithChildren<{}>;

const MainLayout = (props: MainLayoutProps) => {
    const { children } = props;

    return (
        <div id={styles['main-layout']}>
            {/* Header */}
            <div id={styles['main-layout__header']}>
                <NavigationBar />
            </div>

            {/* Body */}
            <div id={styles['main-layout__body']}>{children}</div>

            {/* Footer */}
            <div id={styles['main-layout__footer']}>METAIN | Solana Coding Camp - 2022</div>
        </div>
    );
};

export { MainLayout };
