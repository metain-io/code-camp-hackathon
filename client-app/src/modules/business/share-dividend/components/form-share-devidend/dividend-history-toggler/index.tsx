import { TableDividendHistory } from '@business/share-dividend/components';
import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './styles.module.scss';

const DividendHistoryToggler = () => {
    const [showHistory, setShowHistory] = React.useState(false);

    const handleShow = () => {
        setShowHistory(() => true);
    };

    const handleHide = () => {
        setShowHistory(() => false);
    };

    return (
        <>
            <a href="#" onClick={handleShow}>
                History
            </a>

            <Modal show={showHistory} onHide={handleHide} centered dialogClassName={styles['modal-dialog']}>
                <TableDividendHistory />
            </Modal>
        </>
    );
};

export { DividendHistoryToggler };
