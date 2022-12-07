import { useFormBuyNftContext } from '../form-buy-nft-context';
import { FormBuyNftStatus } from '../form-buy-nft-reducer';
import styles from './styles.module.scss';

const ButtonPurchase = () => {
    const { status, handlePurchaseNft } = useFormBuyNftContext();

    const getButtonText = () => {
        switch (status) {
            case FormBuyNftStatus.Initializing:
                return 'Initializing...';
            case FormBuyNftStatus.Processing:
                return 'Processing...';
            default:
                return 'Purchase';
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
