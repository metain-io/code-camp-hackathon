import { AdminLayout } from '@app/layouts';
import React from 'react';
import SelectBox from './components/select-box';
import styles from './style.module.scss';
import * as web3 from '@solana/web3.js';
import * as SPL from '@solana/spl-token';
import base58 from 'bs58';
import { useNotify } from '@shared/hooks';

export default function FauceTokenPage() {
    const TOKEN_CONFIG = [
        {
            id: '0x0000000000000000000000000000000000000001',
            label: 'USDT',
            value: 'A7yGbWrtgTjXVdxky86CSEyfH6Jy388RYFWfZsH2D8hr',
            icon: '/svg/icon-token-usdt.svg',
        },
        {
            id: '0x0000000000000000000000000000000000000002',
            label: 'USDC',
            value: '3GUqiPovczNg1KoZg5FovwRZ4KPFb95UGZCCTPFb9snc',
            icon: '/svg/icon-token-usdc.svg',
        },
    ];
    const { showToast } = useNotify();

    const [selectToken, setSelectToken] = React.useState(TOKEN_CONFIG[0]);
    const [disableRequestBtn, setDisableRequestToken] = React.useState(false);
    const [disableRequestSOLBtn, setDisableRequestSOLToken] = React.useState(false);

    const changeSelectTokenHandler = (item: any) => {
        setSelectToken(item[0]);
    };

    const createKeyPairFromPrivateKey = (connection: web3.Connection, privateKey: string) => {
        const privateKeyInBase58 = base58.decode(privateKey);
        const keyPair = web3.Keypair.fromSecretKey(privateKeyInBase58);
        return keyPair;
    };

    const requestTokenHandler = async () => {
        setDisableRequestToken(true);
        try {
            let connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
            let transaction = new web3.Transaction();
            let mintPublicKey = new web3.PublicKey(selectToken.value);
            const DECIMAL_NUMBER = Math.pow(10, 6);

            let bossPublicKey = new web3.PublicKey(process.env.NEXT_PUBLIC_BOSS_WALLET_PUBLIC_KEY || '');
            let bossKeypair = createKeyPairFromPrivateKey(
                connection,
                process.env.NEXT_PUBLIC_BOSS_WALLET_PRIVATE_KEY || '',
            );

            let userPublicKeyString = 'k9SWhioWFHrjFiNfu85hNoLzqaMQKnHJykcco84vXNg';
            let userPublicKey = new web3.PublicKey(userPublicKeyString);
            let tokenAccountOfUser = await SPL.getOrCreateAssociatedTokenAccount(
                connection,
                bossKeypair,
                mintPublicKey,
                userPublicKey,
            );

            console.log('============ requestTokenHandler - data: ', {
                tokenAccountOfUser,
                value: tokenAccountOfUser.address.toBase58(),
            });

            let minToInstruction = SPL.createMintToInstruction(
                mintPublicKey,
                tokenAccountOfUser.address,
                bossPublicKey,
                1001 * DECIMAL_NUMBER,
            );
            transaction.add(minToInstruction);

            const rs = await web3.sendAndConfirmTransaction(connection, transaction, [bossKeypair]);
            requestSOLAirdropHandler();

            console.log('============ requestTokenHandler - RS: ', rs);

            // const tmp = Keypair.generate();
            // const tokenAccountUSDTOfUser = await createTokenAccount()
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
            let userPublicKeyString = 'k9SWhioWFHrjFiNfu85hNoLzqaMQKnHJykcco84vXNg';
            let userPublicKey = new web3.PublicKey(userPublicKeyString);
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
                    </div>
                    <div className="form-group">
                        <button
                            disabled={disableRequestBtn}
                            className={[styles.button_1, 'mButton mButton-cn1-bp6'].join(' ')}
                            onClick={requestTokenHandler}
                        >
                            {`Request 1001 ${selectToken.label} & Get SOL Airdrop (if any)`}
                        </button>
                        {/* <button
                            disabled={disableRequestSOLBtn}
                            className={[styles.button_1, 'mButton mButton-cn1-bp6'].join(' ')}
                            onClick={requestSOLAirdropHandler}
                        >
                            {`Request 1 SOL`}
                        </button> */}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
