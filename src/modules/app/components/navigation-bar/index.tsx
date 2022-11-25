import Link from 'next/link';
import styles from './styles.module.scss';

const NavigationBar = () => {
    return (
        <div id={styles['navigation-bar']}>
            <img className={styles['logo']} src="" />

            <ul className={styles['navigation-menu']}>
                <li className={styles['navigation-menu__item']}>
                    <Link href={'/buy-nft'}>Buy NFT</Link>
                </li>
                <li className={styles['navigation-menu__item']}>
                    <Link href={'/claim-dividends'}>Claim Dividends</Link>
                </li>
            </ul>

            <div className={styles['button-connect-placeholder']}></div>
        </div>
    );
};

export { NavigationBar };
