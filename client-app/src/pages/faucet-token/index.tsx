import React from 'react';
import { AdminLayout } from '@app/layouts';
import SelectBox from './components/select-box';
import styles from './style.module.scss';
import * as web3 from '@solana/web3.js';
import * as SPL from '@solana/spl-token';
import base58 from 'bs58';
import { useNotify } from '@shared/hooks';
import { useSelector } from 'react-redux';
import { selectLoginWalletAddress } from '@auth/redux/login/slice';
import { SelectBox_Component } from './components/select-box';
import { useFaucetToken } from './hooks/use-faucet-token';
import { MainBanner } from './components/main-banner';
import { FaucetTokenBox } from './components/faucet-token-box';

export default function FaucetTokenPage() {
    const TOKEN_CONFIG: Array<SelectBox_Component.Value> = [
        {
            label: 'USDT',
            value: 'A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr',
            icon: '/svg/icon-token-usdt.svg',
        },
        {
            label: 'USDC',
            value: '3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc',
            icon: '/svg/icon-token-usdc.svg',
        },
    ];

    const { deviceType } = useFaucetToken();

    return (
        <AdminLayout>
            <div id={styles.row_1}>
                <div id={styles.column_2}>
                    <MainBanner />
                </div>
                <div id={styles.column_3}>
                    {deviceType === 'browser' && <FaucetTokenBox />}
                </div>
            </div>

            {deviceType !== 'browser' && <FaucetTokenBox />}
        </AdminLayout>
    );
}
