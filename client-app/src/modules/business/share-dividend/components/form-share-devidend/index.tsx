import { ChangeEvent, MouseEvent } from 'react';
import { DividendHistoryToggler } from './dividend-history-toggler';
import styles from './styles.module.scss';
import { shareDividend } from './share-dividend';

const FormShareDividend = () => {
    const { handleAmountDevidendChanged, amountDevidend, handleShareDividend, handleNextDay, handleReset } =
        shareDividend();

    const onInputAmountDividendChanged = (e: ChangeEvent<HTMLInputElement>) => {
        handleAmountDevidendChanged(e.target.value);
    };

    const onButtonShareDividendClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleShareDividend();
    };

    const onButtonNextDayClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleNextDay();
    };

    const onButtonResetClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleReset();
    };

    return (
        <form className={styles['form']}>
            <div className={styles['form-header']}>
                <label className={styles['form-title']}>See Share Dividend History: </label>

                <div>
                    <DividendHistoryToggler />
                </div>
            </div>

            <div className={styles['form-group']}>
                <label>Devidend for 1 NFT / day</label>
                <input value={amountDevidend} onChange={onInputAmountDividendChanged} />
            </div>

            <button onClick={onButtonShareDividendClicked}>Share Dividend</button>

            <br></br>

            <button onClick={onButtonResetClicked}>Next Day</button>

            <br></br>

            <button onClick={onButtonNextDayClicked}>Reset Demo</button>
        </form>
    );
};

export { FormShareDividend };
