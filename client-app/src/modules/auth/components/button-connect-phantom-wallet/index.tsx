import styles from './styles.module.scss';
import { useButtonConnectPhantomWallet } from './use-button-connect-phantom-wallet';

const ButtonConnectPhantomWallet = () => {
    const { handleOnClicked } = useButtonConnectPhantomWallet();

    return (
        <button className={[styles.button, 'mButton', 'mButton-cp5-bn1'].join(' ')} onClick={handleOnClicked}>
            Connect Phantom Wallet
        </button>
    );
};

export { ButtonConnectPhantomWallet };
