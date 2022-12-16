import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
import { MintNFT } from '@business/mint-nft/components';
import styles from './styles.module.scss';

const PageShareDividend = () => {
    return (
        <div className={['page-container', styles['container']].join(' ')}>
            <MintNFT />
        </div>
    );
};

PageShareDividend.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageShareDividend;
