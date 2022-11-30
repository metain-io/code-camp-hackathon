import { FormShareDividend } from '@business/share-dividend/components';
import styles from './styles.module.scss';

const PageBuyNft = () => {
    return (
        <div className={['page-container', styles['container']].join(' ')}>
            <h1 className={['page-title', styles['title']].join(' ')}>Share Dividend</h1>

            <div className={styles['form-buy-nft-placeholder']}>{<FormShareDividend />}</div>
        </div>
    );
};

export default PageBuyNft;
