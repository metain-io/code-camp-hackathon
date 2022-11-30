import { AdminLayout } from '@app/layouts';
import { FormBuyNft } from '@business/buy-nft/components';
import { ReactElement } from 'react';
import styles from './styles.module.scss';

const PageBuyNft = () => {
    return (
        <div className={['page-container', styles['container']].join(' ')}>
            <h1 className={['page-title', styles['title']].join(' ')}>Buy NFT</h1>

            <div className={styles['form-buy-nft-placeholder']}>
                <FormBuyNft />
            </div>
        </div>
    );
};

PageBuyNft.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageBuyNft;
