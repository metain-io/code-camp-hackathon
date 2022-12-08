import axios from '@api/metain/axios-client';
import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import { DividendHistoryToggler } from './dividend-history-toggler';
import styles from './styles.module.scss';
import { useShareDividend } from './use-share-dividend';
import moment from 'moment';

const FormShareDividend = () => {
    const [currentDemoDate, setCurrentDemoDate] = useState('');
    const [newDemoDate, setNewDemoDate] = useState('2023-01-01');
    const [dividendFromDate, setDividendFromDate] = useState('2023-01-01');
    const [dividendToDate, setDividendToDate] = useState('2023-01-01');
    const [dividendAmount, setDividendAmount] = useState('0.1');

    const init = async () => {
        const result = await axios.get('https://api.niatem-beta.com/hackathon/get-offset-times');
        const dt = moment((result as any).body.counter).format('YYYY-MM-DD');
        setNewDemoDate(dt);
        setCurrentDemoDate(dt);
    };

    useEffect(() => {
        init();
    }, []);

    const { handleAmountDevidendChanged, amountDevidend, handleShareDividend, handleNextDay, handleReset } =
        useShareDividend();

    const onInputAmountDividendChanged = (e: ChangeEvent<HTMLInputElement>) => {
        handleAmountDevidendChanged(e.target.value);
    };

    const onButtonShareDividendClicked = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await axios.post('https://api.niatem-beta.com/hackathon/share-dividend', {
            from: moment(dividendFromDate, 'YYYY-MM-DD').valueOf(),
            to: moment(dividendToDate, 'YYYY-MM-DD').valueOf(),
            value: dividendAmount,
        });
        console.log(result);
    };

    const onButtonNextDayClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleNextDay();
    };

    const onButtonResetClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleReset();
    };

    const setDemoDate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await axios.post('https://api.niatem-beta.com/hackathon/set-offset-timestamp', {
            timestamp: moment(newDemoDate, 'YYYY-MM-DD').valueOf(),
        });
        console.log(result);
        setCurrentDemoDate(newDemoDate);
    };

    return (
        <div>
            <form className={styles['form']}>
                <div>
                    <label>Demo date:</label>
                    <input readOnly value={currentDemoDate} />

                    <input value={newDemoDate} type="date" onChange={(e) => setNewDemoDate(e.target.value)} />
                    <button type="button" onClick={setDemoDate}>
                        Set Demo Date
                    </button>
                </div>

                <hr />

                <div className={styles['form-group']}>
                    <label>Dividend for 1 NFT / day</label>
                    <div>
                        <label>From</label>
                        <input
                            type="date"
                            value={dividendFromDate}
                            onChange={(e) => setDividendFromDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>To</label>
                        <input type="date" value={dividendToDate} onChange={(e) => setDividendToDate(e.target.value)} />
                    </div>
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            value={dividendAmount}
                            onChange={(e) => setDividendAmount(e.target.value)}
                        />
                    </div>

                    <button onClick={onButtonShareDividendClicked}>Share Dividend</button>
                </div>
            </form>
        </div>
    );
};

export { FormShareDividend };
