import { AdminLayout } from '@app/layouts';
import { ReactElement } from 'react';
import FaucetTokenBox from '../../modules/business/faucet-token/components/faucet-token-box';
import MainBanner from '../../modules/business/faucet-token/components/main-banner';
import { useFaucetToken } from '../../modules/business/faucet-token/hooks/use-faucet-token';
import styles from './style.module.scss';

const FaucetTokenPage = () => {
    const { deviceType } = useFaucetToken();

    return (
        <>
            <div id={styles.row_1}>
                <div id={styles.column_2}>
                    <MainBanner />
                </div>
                <div id={styles.column_3}>
                    {deviceType === 'browser' && <FaucetTokenBox />}
                </div>
            </div>

            {deviceType !== 'browser' && <div className={styles.mobile_container}><FaucetTokenBox /></div>}
        </>
    );
}

FaucetTokenPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default FaucetTokenPage;
