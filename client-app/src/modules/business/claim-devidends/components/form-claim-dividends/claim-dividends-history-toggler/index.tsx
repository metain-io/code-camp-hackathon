import { TableClaimDividendsHistory } from '@business/claim-devidends/components';
import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './styles.module.scss';

const ClaimDividendsHistoryToggler = () => {
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
                <label className={styles['modal-title']}>Claim Dividends History</label>
                <TableClaimDividendsHistory />
            </Modal>
        </>
    );
};

export { ClaimDividendsHistoryToggler };
