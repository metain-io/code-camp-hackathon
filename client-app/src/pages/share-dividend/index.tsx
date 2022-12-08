import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
import { FormShareDividend } from '@business/share-dividend/components';
import styles from './styles.module.scss';

const PageShareDividend = () => {
    return (
        <div className={['page-container', styles['container']].join(' ')}>
            {/*<h1 className={['page-title', styles['title']].join(' ')}>Share Dividend</h1>*/}
            {/*<div className={styles['form-buy-nft-placeholder']}>{<FormShareDividend />}</div>*/}
            <FormShareDividend />
        </div>
    );
};

PageShareDividend.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default PageShareDividend;
