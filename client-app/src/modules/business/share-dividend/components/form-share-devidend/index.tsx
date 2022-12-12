import axios from '@api/metain/axios-client';
import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import { DividendHistoryToggler } from './dividend-history-toggler';
import styles from './styles.module.scss';
import { useShareDividend } from './use-share-dividend';
import { useNotify } from '@shared/hooks';
import moment from 'moment';

const FormShareDividend = () => {
    const [currentDemoDate, setCurrentDemoDate] = useState('');
    const [newDemoDate, setNewDemoDate] = useState('2023-01-01');
    const [dividendFromDate, setDividendFromDate] = useState('2023-01-01');
    const [dividendToDate, setDividendToDate] = useState('2023-01-01');
    const [dividendAmount, setDividendAmount] = useState('0.1');
    const { showToast } = useNotify();

    const init = async () => {
        const result = await axios.get('https://api.niatem-beta.com/hackathon/get-offset-times');
        const dt = moment((result as any).body).format('YYYY-MM-DD');
        setNewDemoDate(dt);
        setCurrentDemoDate(dt);
    };

    useEffect(() => {
        init();
    }, []);

    // const { handleAmountDevidendChanged, amountDevidend, handleShareDividend, handleNextDay, handleReset } =
    //     useShareDividend();

    // const onInputAmountDividendChanged = (e: ChangeEvent<HTMLInputElement>) => {
    //     handleAmountDevidendChanged(e.target.value);
    // };

    const onButtonShareDividendClicked = async (e: MouseEvent<HTMLButtonElement>) => {
        const dividendValue = parseFloat(dividendAmount);

        e.preventDefault();
        const result = await axios.post('https://api.niatem-beta.com/hackathon/share-dividend', {
            from: moment(dividendFromDate, 'YYYY-MM-DD').valueOf(),
            to: moment(dividendToDate, 'YYYY-MM-DD').valueOf(),
            value: dividendValue,
        });
        console.log(result);

        if (result.hasOwnProperty('error')) {
            let error = 'Share Dividend Failed';
            showToast({
                status: 'error',
                message: error,
            });
        } else {
            showToast({
                status: 'success',
                message: 'Share Dividend successfully',
            });
        }
    };

    const onButtonResetClicked = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await axios.post('https://api.niatem-beta.com/hackathon/reset-offset-timestamp');
        console.log(result);

        if (result.hasOwnProperty('error')) {
            let error = 'Reset Demo Failed';
            showToast({
                status: 'error',
                message: error,
            });
        } else {
            showToast({
                status: 'success',
                message: 'Reset Demo successfully',
            });
        }
    };

    const setDemoDate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await axios.post('https://api.niatem-beta.com/hackathon/set-offset-timestamp', {
            timestamp: moment(newDemoDate, 'YYYY-MM-DD').valueOf(),
        });
        console.log(result);
        setCurrentDemoDate(newDemoDate);

        if (result.hasOwnProperty('error')) {
            let error = 'Set Demo Time Failed';
            showToast({
                status: 'error',
                message: error,
            });
        } else {
            showToast({
                status: 'success',
                message: 'Set Demo Time successfully',
            });
        }
    };

    return (
        <div id={styles.dividend_container}>
            <div className={styles.div_1}>
                <span className={styles.span_1}>Demo date</span>
                <input className={[styles.input_1, 'form-control'].join(' ')} value={currentDemoDate} disabled />
            </div>
            <div className={styles.div_2}>
                <input
                    type="date"
                    className={[styles.input_2, 'form-control'].join(' ')}
                    value={newDemoDate}
                    onChange={(e) => setNewDemoDate(e.target.value)}
                />
                <button type="button" className={styles.button_1} onClick={setDemoDate}>
                    Set Demo Date
                </button>
            </div>
            <span className={styles.span_2}>Dividend for 1 NFT / day</span>
            <div className={styles.div_3}>
                <div className={styles.div_4}>
                    <span className={styles.span_1}>From</span>
                    <input
                        type="date"
                        className={[styles.input_3, 'form-control'].join(' ')}
                        value={dividendFromDate}
                        onChange={(e) => setDividendFromDate(e.target.value)}
                    />
                </div>
                <div className={styles.div_4}>
                    <span className={styles.span_1}>To</span>
                    <input
                        type="date"
                        className={[styles.input_3, 'form-control'].join(' ')}
                        value={dividendToDate}
                        onChange={(e) => setDividendToDate(e.target.value)}
                    />
                </div>
                <div className={styles.div_5}>
                    <span className={styles.span_1}>Amount</span>
                    <input
                        type="number"
                        className={[styles.input_1, 'form-control'].join(' ')}
                        value={dividendAmount}
                        onChange={(e) => setDividendAmount(e.target.value)}
                    />
                </div>
            </div>

            <button type="button" className={styles.button_1} onClick={onButtonShareDividendClicked}>
                Share Dividend
            </button>

            <button type="button" className={styles.button_1} onClick={onButtonResetClicked}>
                Reset Demo
            </button>
        </div>
    );
};

export { FormShareDividend };
