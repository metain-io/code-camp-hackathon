import { TableBuyNftHistory } from '@business/buy-nft/components';
import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './styles.module.scss';

const BuyNftHistoryToggler = () => {
    const [showHistory, setShowHistory] = React.useState(false);

    const handleShow = () => {
        setShowHistory(true);
    };

    const handleHide = () => {
        setShowHistory(false);
    };

    return (
        <>
            <a href="#" onClick={handleShow} style={{ color: 'white', textDecoration: 'underline' }}>
                History
            </a>

            <Modal show={showHistory} onHide={handleHide} centered dialogClassName={styles['modal-dialog']}>
                <TableBuyNftHistory />
            </Modal>
        </>
    );
};

export { BuyNftHistoryToggler };
