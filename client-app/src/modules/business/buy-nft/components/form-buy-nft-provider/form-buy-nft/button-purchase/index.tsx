import { FormBuyNftStatus, useFormBuyNftContext } from '../../form-buy-nft-context';
import styles from './styles.module.scss';

const ButtonPurchase = () => {
    const { status, error, handlePurchaseNft } = useFormBuyNftContext();

    return (
        <button
            className={['mButton mButton-cn1-bp6', styles.button].join(' ')}
            onClick={handlePurchaseNft}
            disabled={status == FormBuyNftStatus.Loading || status == FormBuyNftStatus.Processing}
        >
            {status == FormBuyNftStatus.Processing
                ? 'Processing...'
                : status == FormBuyNftStatus.ProcessFailed
                ? error
                : status == FormBuyNftStatus.ProcessSucceeded
                ? 'Purchase Succeeded'
                : 'Purchase'}
        </button>
    );
};

export { ButtonPurchase };
