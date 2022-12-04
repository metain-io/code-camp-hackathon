import { useFormBuyNftContext } from '../form-buy-nft-context';
import { FormBuyNftStatus } from '../use-form-buy-nft';
import styles from './styles.module.scss';

const ButtonPurchase = () => {
    const { status, error, handlePurchaseNft } = useFormBuyNftContext();

    const getButtonText = () => {
        switch (status) {
            case FormBuyNftStatus.Initializing:
                return 'Initializing...';
            case FormBuyNftStatus.InitializeSucceeded:
                return 'Purchase';
            case FormBuyNftStatus.Processing:
                return 'Processing...';
            case FormBuyNftStatus.ProcessSucceeded:
                return 'Purchase Succeeded';
            case FormBuyNftStatus.InitializeFailed:
            case FormBuyNftStatus.ProcessFailed:
                return error;
        }
    };

    return (
        <button
            className={['mButton mButton-cn1-bp6', styles.button].join(' ')}
            onClick={handlePurchaseNft}
            disabled={status == FormBuyNftStatus.Initializing || status == FormBuyNftStatus.Processing}
        >
            {getButtonText()}
        </button>
    );
};

export { ButtonPurchase };
