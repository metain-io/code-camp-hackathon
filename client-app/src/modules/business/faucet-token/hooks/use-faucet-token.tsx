import React from 'react';
import base58 from 'bs58';
import * as SPL from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import { selectLoginWalletAddress } from '@auth/redux/login/slice';
import WalletService from '@crypto-wallet/services/crypto-wallet-service';
import { useNotify, useResponsive } from '@shared/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { SelectBox_Component } from '../components/select-box';
import { accountActions } from 'modules/account/redux/slice';

const useFaucetToken = () => {
    const DECIMAL_NUMBER = BigInt(Math.pow(10, 6));
    const TOKEN_CONFIG: Array<SelectBox_Component.Value> = WalletService._currentWallet?.tokenForSelect || [];

    const { showToast } = useNotify();
    const deviceType = useResponsive();
    const walletAddress = useSelector(selectLoginWalletAddress);
    const dispatch = useDispatch();

    const [balances, setBalances] = React.useState<{ [name: string]: number | bigint }>({
        [TOKEN_CONFIG[0].label]: 0,
        [TOKEN_CONFIG[1].label]: 0,
    });

    React.useEffect(() => {
        dispatch(accountActions.getTokenBalanceRequested());
        dispatch(accountActions.getNftBalanceRequested());
    }, [])

    const getBalances = async () => {
        const tmpBalances = await WalletService._currentWallet?.getBalances() || {};

        setBalances(tmpBalances);
        return tmpBalances;
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
