import ReactTooltip from 'react-tooltip';
import styles from './styles.module.scss';
import { useWalletAddress } from './use-wallet-address';

const WalletAddress = () => {
    const { walletAddress, copyState, handleCopyToClipboard } = useWalletAddress();

    return (
        <div id={styles.wallet_wrapper} data-tip={true} data-for="tooltip-username" onClick={handleCopyToClipboard}>
            <img className={styles.image_1} src={'/svg/icon-token-sol.svg'} alt="" />
            <span className={styles.span_1}>{walletAddress}</span>

            <ReactTooltip id="tooltip-username" uuid="tooltip-username" type="info" effect="solid">
                <div className={styles.commission_tooltip_area}>{<span>{copyState ? copyState : 'Copy'}</span>}</div>
            </ReactTooltip>
        </div>
    );
};

export { WalletAddress };
