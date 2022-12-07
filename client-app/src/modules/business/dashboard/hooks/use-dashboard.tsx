import { getExchangeRateList } from '@api/metain/entry-points/oracle';
import { selectLoginWalletAddress } from '@auth/redux/login/slice';
import WalletService from '@crypto-wallet/services/crypto-wallet-service';
import logger from '@libs/logger';
import { accountActions, selectAccountNftBalance } from 'modules/account/redux/slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectBox_Component } from '../components/select-box';
import { Table_Component } from '../components/table/type';

export type ExchangeRateItem = {
    max_usdt_rate: number;
    min_usdt_rate: number;
    coin: string;
};

const useDashboard = () => {
    const TOKEN_CONFIG: Array<SelectBox_Component.Value> = WalletService._currentWallet?.tokenForSelect || [];
    const walletAddress = useSelector(selectLoginWalletAddress);
    const nftBalances = useSelector(selectAccountNftBalance);
    const dispatch = useDispatch();

    const [balances, setBalances] = React.useState<{ [name: string]: number | bigint }>({
        [TOKEN_CONFIG[0].label]: 0,
        [TOKEN_CONFIG[1].label]: 0,
    });
    const [userTokenList, setUserTokenList] = React.useState<Array<Table_Component.Row>>([]);
    const [dashboardData, setDashboardData] = React.useState({
        totalNFT: BigInt(0),
        totalNFTValue: BigInt(0),
        yesterdayPNL: 0,
        totalIncome: 0,
    });

    React.useEffect(() => {
        dispatch(accountActions.getTokenBalanceRequested());
        dispatch(accountActions.getNftBalanceRequested());
    }, []);

    React.useEffect(() => {
        const entries = Object.entries(nftBalances);

        if (nftBalances && entries && entries.length > 0) {
            let totalNFT = BigInt(0);
            let totalNFTValue = BigInt(0);

            entries.forEach((item: any, idx: number) => {
                totalNFT += BigInt(item?.[1]?.amount || 0);
                totalNFTValue += BigInt(item?.[1]?.amount || 0) * BigInt(item?.[1]?.price || 0);
            });

            setDashboardData({ ...dashboardData, totalNFT, totalNFTValue });
        }
    }, [nftBalances]);

    const getBalances = async () => {
        return (await WalletService._currentWallet?.getBalances()) || {};
    };

    const getAndConvertBalance2TokenTableData = async () => {
        const [tmpBalances, exchangeRateList] = await Promise.all([getBalances(), getExchangeRateList()]);
        const entries = Object.entries(tmpBalances);
        const tokenTableData: Array<Table_Component.Row> = [];

        entries &&
            entries.length > 0 &&
            entries.forEach((item, idx: number) => {
                const exchangeRateItem: ExchangeRateItem | undefined = exchangeRateList?.find(
                    (value: ExchangeRateItem, index: number) => {
                        return value?.coin === item[0];
                    },
                );
                const currentPrice = exchangeRateItem?.max_usdt_rate ?? 0;

                tokenTableData.push({
                    name: item[0],
                    symbol: item[0],
                    current_price: currentPrice,
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
        nftBalances,
        dashboardData,
        getBalances,
        getAndConvertBalance2TokenTableData,
    };
};

export { useDashboard };
