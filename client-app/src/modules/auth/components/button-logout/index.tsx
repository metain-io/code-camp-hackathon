import styles from './styles.module.scss';
import { useButtonLogout } from './use-button-logout';

const ButtonLogout = () => {
    const { handleLogout } = useButtonLogout();

    return (
        <span className={styles.button_logout} onClick={handleLogout}>
            <i className={[styles.icon_3, 'fml fm-arrow-square-right'].join(' ')}></i>
            Logout
        </span>
    );
};

export { ButtonLogout };
