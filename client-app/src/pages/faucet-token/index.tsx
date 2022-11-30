import { AdminLayout } from '@app/layouts';
import React from 'react';
import SelectBox from './components/select-box';
import styles from './style.module.scss';

export default function FauceTokenPage() {
    const TOKEN_CONFIG = [
        {
            id: '0x0000000000000000000000000000000000000001',
            label: 'USDT',
            value: 'A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr',
            icon: '/svg/icon-token-usdt.svg'
        },
        {
            id: '0x0000000000000000000000000000000000000002',
            label: 'USDC',
            value: '3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc',
            icon: '/svg/icon-token-usdc.svg'
        },
    ];

    const [selectToken, setSelectToken] = React.useState(TOKEN_CONFIG[0])

    const changeSelectTokenHandler = (item: any) => {
        setSelectToken(item[0])
    }

    const requestTokenHandler = () => {

    }

    return (
        <AdminLayout>
            <div className="mBlock" id={styles.faucet_token_wrapper}>
                <span className={[styles.span_1, 'header'].join(' ')}>Faucet Token</span>
                <div className={styles.div_1}>
                    <div className="form-group">
                        <span className="title">{`Token ${selectToken.label} - ${selectToken.value}`}</span>
                        <SelectBox
                            className={styles.selectbox_1}
                            value={[selectToken as any]}
                            options={TOKEN_CONFIG}
                            C_onChange={changeSelectTokenHandler}
                        />
                        <button
                            className={[styles.button_1, 'mButton mButton-cn1-bp6'].join(' ')}
                            onClick={requestTokenHandler}
                        >
                            {`Request 1001 ${selectToken.label}`}
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
