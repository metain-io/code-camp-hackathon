import React from 'react';
import { selectLoginWalletAddress } from '@auth/redux/login/slice';
import { useSelector } from 'react-redux';
import * as web3 from '@solana/web3.js';
import * as SPL from '@solana/spl-token';
import base58 from 'bs58';
import { SelectBox_Component } from '../components/select-box';
import { useNotify, useResponsive } from '@shared/hooks';

const useFaucetToken = () => {
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

    const { showToast } = useNotify();
    const deviceType = useResponsive();
    const walletAddress = useSelector(selectLoginWalletAddress);

    const [balances, setBalances] = React.useState<{ [name: string]: number | bigint }>({
        [TOKEN_CONFIG[0].label]: 0,
        [TOKEN_CONFIG[1].label]: 0,
    });

    const getBalances = async (tokenAddress: string) => {
        try {
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            const tokenAccounts = await connection.getTokenAccountsByOwner(new web3.PublicKey(walletAddress), {
                programId: SPL.TOKEN_PROGRAM_ID,
            });
            const tmpBalances: { [name: string]: number | bigint } = {};
            const solAmount = await connection.getBalance(new web3.PublicKey(walletAddress));

            tmpBalances['SOL'] = (BigInt(solAmount) / BigInt(web3.LAMPORTS_PER_SOL));
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
        }
    };

    const createKeyPairFromPrivateKey = (connection: web3.Connection, privateKey: string) => {
        const privateKeyInBase58 = base58.decode(privateKey);
        const keyPair = web3.Keypair.fromSecretKey(privateKeyInBase58);
        return keyPair;
    };

    const requestTokenHandler = async (selectToken: SelectBox_Component.Value, setDisableRequestToken: any) => {
        setDisableRequestToken(true);
        try {
            let connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            let transaction = new web3.Transaction();
            let mintPublicKey = new web3.PublicKey(selectToken.value);

            let bossPublicKey = new web3.PublicKey(process.env.NEXT_PUBLIC_BOSS_WALLET_PUBLIC_KEY || '');
            let bossKeypair = createKeyPairFromPrivateKey(
                connection,
                process.env.NEXT_PUBLIC_BOSS_WALLET_PRIVATE_KEY || '',
            );

            let userPublicKey = new web3.PublicKey(walletAddress);
            let tokenAccountOfUser = await SPL.getOrCreateAssociatedTokenAccount(
                connection,
                bossKeypair,
                mintPublicKey,
                userPublicKey,
            );

            let minToInstruction = SPL.createMintToInstruction(
                mintPublicKey,
                tokenAccountOfUser.address,
                bossPublicKey,
                BigInt(1001) * DECIMAL_NUMBER,
            );
            transaction.add(minToInstruction);

            const rs = await web3.sendAndConfirmTransaction(connection, transaction, [bossKeypair]);
            requestSOLAirdropHandler();

            showToast({
                status: 'success',
                message: `Requested 1001 ${selectToken.label} successfully`,
            });
        } catch (error: any) {
            console.log('============ requestTokenHandler - ERROR: ', error);
        } finally {
            setDisableRequestToken(false);
        }
    };

    const requestSOLAirdropHandler = async () => {
        // setDisableRequestSOLToken(true);
        try {
            let connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            let userPublicKey = new web3.PublicKey(walletAddress);
            await connection.requestAirdrop(userPublicKey, web3.LAMPORTS_PER_SOL);

            showToast({
                status: 'success',
                message: `Requested SOL Airdrop successfully`,
            });
        } catch (error: any) {
            console.log('============ requestSOLAirdropHandler - ERROR: ', error);
        } finally {
            // setDisableRequestSOLToken(false);
        }
    };

    return {
        balances,
        walletAddress,
        deviceType,
        TOKEN_CONFIG,
        requestSOLAirdropHandler,
        requestTokenHandler,
        getBalances,
    };
};

export { useFaucetToken };
