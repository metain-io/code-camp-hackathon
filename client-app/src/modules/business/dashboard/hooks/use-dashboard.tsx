import React from 'react';
import * as web3 from '@solana/web3.js';
import * as SPL from '@solana/spl-token';
import { SelectBox_Component } from '../components/select-box';
import { useSelector } from 'react-redux';
import { selectLoginWalletAddress } from '@auth/redux/login/slice';
import { Table_Component } from '../components/table/type';
import WalletService from '@crypto-wallet/services/crypto-wallet-service';
import logger from '@libs/logger';

const useDashboard = () => {
    const TOKEN_CONFIG: Array<SelectBox_Component.Value> = WalletService._currentWallet?.tokenForSelect || [];
    const walletAddress = useSelector(selectLoginWalletAddress);

    const [balances, setBalances] = React.useState<{ [name: string]: number | bigint }>({
        [TOKEN_CONFIG[0].label]: 0,
        [TOKEN_CONFIG[1].label]: 0,
    });
    const [userTokenList, setUserTokenList] = React.useState<Array<Table_Component.Row>>([]);

    const getBalances = async () => {
        return (await WalletService._currentWallet?.getBalances(walletAddress)) || {};
    };

    const getAndConvertBalance2TokenTableData = async () => {
        const tmpBalances = await getBalances();
        const entries = Object.entries(tmpBalances);
        const tokenTableData: Array<Table_Component.Row> = [];

        entries &&
            entries.length > 0 &&
            entries.forEach((item, idx) => {
                tokenTableData.push({
                    name: item[0],
                    symbol: item[0],
                    current_price: item[0] == 'SOL' ? 16 : 1,
                    amount: item[1]?.toString() || '0',
                });
            });
        setBalances(tmpBalances);
        setUserTokenList(tokenTableData);

        logger.debug('============ getAndConvertBalance2TokenTableData - RS: ', tokenTableData);

        return tokenTableData;
    };

    return {
        balances,
        walletAddress,
        userTokenList,
        getBalances,
        getAndConvertBalance2TokenTableData,
    };
};

export { useDashboard };
