import { useFormBuyNftContext } from '../../form-buy-nft-context';
import { FormBuyNftStatus } from '../../use-form-buy-nft';
import styles from './styles.module.scss';

const ButtonPurchase = () => {
    const { status, error, handlePurchaseNft } = useFormBuyNftContext();

    return (
        <button
            className={['mButton mButton-cn1-bp6', styles.button].join(' ')}
            onClick={handlePurchaseNft}
            disabled={status == FormBuyNftStatus.Initializing || status == FormBuyNftStatus.Processing}
        >
            {status == FormBuyNftStatus.Initializing
                ? 'Initializing...'
                : status == FormBuyNftStatus.InitializeFailed
                ? error
                : status == FormBuyNftStatus.InitializeSucceeded
                ? 'Purchase'
                : status == FormBuyNftStatus.Processing
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
