import React from 'react';
import styles from './styles.module.scss';

const BackdropSpinner = () => {
    return <span id={styles.component_back_drop_spinner} className={[styles.active, 'mLoading'].join(' ')}></span>;
};

export { BackdropSpinner };
