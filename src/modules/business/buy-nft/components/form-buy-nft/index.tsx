import { ChangeEvent, MouseEvent } from 'react';
import { BuyNftHistoryToggler } from './buy-nft-history-toggler';
import styles from './styles.module.scss';
import { useBuyNft } from './use-buy-nft';

const FormBuyNft = () => {
    const { amountNft, handleAmountSolChanged, amountSol, handleAmountNftChanged, handleBuyNft } = useBuyNft();

    const onInputAmountSolChanged = (e: ChangeEvent<HTMLInputElement>) => {
        handleAmountSolChanged(e.target.value);
    };

    const onInputAmountNftChanged = (e: ChangeEvent<HTMLInputElement>) => {
        handleAmountNftChanged(e.target.value);
    };

    const onButtonBuyNftClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleBuyNft();
    };

    return (
        <>
            <form className={styles['form']}>
                <div className={styles['form-header']}>
                    <label className={styles['form-title']}>Buy NFT for future life!!</label>

                    <div>
                        <BuyNftHistoryToggler />
                    </div>
                </div>

                <div className={styles['form-group']}>
                    <label>Amount Sol</label>
                    <input value={amountSol} onChange={onInputAmountSolChanged} />
                </div>

                <div className={styles['form-group']}>
                    <label>Amount NFT</label>
                    <input value={amountNft} onChange={onInputAmountNftChanged} />
                </div>

                <button onClick={onButtonBuyNftClicked}>Buy</button>
            </form>
        </>
    );
};

export { FormBuyNft };
