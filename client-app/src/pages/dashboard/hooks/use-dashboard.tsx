import React from 'react';
import * as web3 from '@solana/web3.js';
import * as SPL from '@solana/spl-token';
import { SelectBox_Component } from '../components/select-box';
import { useSelector } from 'react-redux';
import { selectLoginWalletAddress } from '@auth/redux/login/slice';
import { Table_Component } from '../components/table/type';

const useDashboard = () => {
    const DECIMAL_NUMBER = BigInt(Math.pow(10, 6));
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
    const walletAddress = useSelector(selectLoginWalletAddress);

    const [balances, setBalances] = React.useState<{ [name: string]: number | bigint }>({
        [TOKEN_CONFIG[0].label]: 0,
        [TOKEN_CONFIG[1].label]: 0,
    });
    const [userTokenList, setUserTokenList] = React.useState<Array<Table_Component.Row>>([])

    const getBalances = async (tokenAddress: string) => {
        const tmpBalances: { [name: string]: number | bigint } = {};
        try {
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            const tokenAccounts = await connection.getTokenAccountsByOwner(new web3.PublicKey(walletAddress), {
                programId: SPL.TOKEN_PROGRAM_ID,
            });
            const solAmount = await connection.getBalance(new web3.PublicKey(walletAddress));

            tmpBalances['SOL'] = BigInt(solAmount) / BigInt(web3.LAMPORTS_PER_SOL);
            tokenAccounts?.value?.forEach((tokenAccount) => {
                const accountData = SPL.AccountLayout.decode(tokenAccount.account.data);

                const relatedToken = TOKEN_CONFIG.find((item, index) => {
                    return item.value == accountData.mint.toBase58();
                });
                if (relatedToken) {
                    tmpBalances[relatedToken.label] = accountData.amount / DECIMAL_NUMBER;
                }
            });
            console.log('================== getBalances - BALANCE: ', tmpBalances);

            setBalances(tmpBalances);
        } catch (error: any) {
            console.log('============ getBalances - ERROR: ', error);
            return {};
        }
        return tmpBalances;
    };

    const getAndConvertBalance2TokenTableData = async () => {
        const tmpBalances = await getBalances(walletAddress);
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
        setUserTokenList(tokenTableData);

        console.log('============ getAndConvertBalance2TokenTableData - RS: ', tokenTableData);

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
