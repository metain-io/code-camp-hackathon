import { useFormBuyNftContext } from '../../form-buy-nft-context';
import styles from './styles.module.scss';

const ButtonPurchase = () => {
    const { handlePurchaseNft } = useFormBuyNftContext();

    return (
        <button className={['mButton mButton-cn1-bp6', styles.button].join(' ')} onClick={handlePurchaseNft}>
            PURCHASE
        </button>
    );
};

export { ButtonPurchase };
