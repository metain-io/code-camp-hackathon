import React from 'react';
import styles from './styles.module.scss';
import Image from '../image';
import Anchor from '../anchor';
import BackdropSpinner from '../backdrop-spinner';
import SelectBox, { SelectBox_Component } from '../select-box';
import { useFaucetToken } from '@business/faucet-token/hooks/use-faucet-token';

const FaucetTokenBox = () => {
    const { balances, TOKEN_CONFIG, getBalances } = useFaucetToken();

    const intervalRef = React.useRef<any>(undefined);

    const [selectToken, setSelectToken] = React.useState(TOKEN_CONFIG[0]);
    const [disableRequestBtn, setDisableRequestToken] = React.useState(false);

    React.useEffect(() => {
        getBalances(selectToken.value);
        intervalRef.current = setInterval(() => {
            getBalances(selectToken.value);
        }, 10 * 1000)

        return () => {
            console.log('============= CLEAR INTERVAL: ', intervalRef.current)
            intervalRef.current && clearInterval(intervalRef.current)
        }
    }, []);

    return (
        <div id={styles.preorder_container}>
            <div className={styles.inner_content}>
                <PreOrderWidgetBoxHeader selectToken={selectToken} balances={balances}/>
                <PreOrderWidgetBoxBody selectToken={selectToken} setSelectToken={setSelectToken} disableRequestBtn={disableRequestBtn} setDisableRequestToken={setDisableRequestToken}/>
            </div>
        </div>
    );
};

const PreOrderWidgetBoxHeader = (props: any) => {
    const { selectToken, balances } = props;

    return (
        <div id={styles.header_wrapper}>
            <Image className={styles.image_1} src={'/image/vot/vot-1.png'} />

            <div className={styles.div_1}>
                <span className={styles.span_1}>FAUCET TOKEN</span>
                {/* <Anchor href="/buy-nft" className={[styles.span_1, styles.arrow].join(' ')}>
                    M-VOT1: YYYYYYYY
                </Anchor> */}

                <div className={styles.div_2}>
                    <div className={styles.div_3}>
                        <div className={styles.item_1}>
                            <span className={styles.span_2}>Token symbol</span>
                            <span className={styles.span_3}>{selectToken.label}</span>
                        </div>
                        <div className={styles.item_1}>
                            <span className={styles.span_2}>Balance</span>
                            <span className={styles.span_3}>{balances?.[selectToken.label]?.toString() || '0'}</span>
                        </div>
                    </div>
                    <div className={styles.item_1}>
                        <span className={styles.span_2}>Address</span>
                        <span className={styles.span_3}>{selectToken.value}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PreOrderWidgetBoxBody = (props: any) => {
    const { selectToken, setSelectToken, disableRequestBtn, setDisableRequestToken } = props;
    const { TOKEN_CONFIG, requestTokenHandler } = useFaucetToken();

    return (
        <div id={styles.confirmorder_wrapper}>
            <div className="form-group">
                <span className="title">Choose a token to faucet</span>
                <SelectBox
                    className={styles.selectbox_1}
                    value={[selectToken as any]}
                    options={TOKEN_CONFIG}
                    C_onChange={(item: any) => setSelectToken(item[0])}
                />
            </div>

            <div className={styles.separator_1}></div>

            <button
                disabled={disableRequestBtn}
                className={[styles.button_1, 'mButton mButton-cn1-bp6'].join(' ')}
                onClick={() => requestTokenHandler(selectToken, setDisableRequestToken)}
            >
                {`Request 1001 ${selectToken.label}`}
                <br />
                {`& Get 1 SOL Airdrop (if any)`}
            </button>

            <BackdropSpinner active={disableRequestBtn} />
        </div>
    );
};

FaucetTokenBox.displayName = 'FaucetTokenBox';

export default FaucetTokenBox;
