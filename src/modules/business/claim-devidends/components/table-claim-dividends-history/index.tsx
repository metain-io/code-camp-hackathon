import styles from './styles.module.scss';
import { useClaimDividendsHistory } from './use-claim-dividends-history';

const TableClaimDividendsHistory = () => {
    const { claimDividendsHistory } = useClaimDividendsHistory();

    return (
        <div className={styles['table-wrapper']}>
            <table>
                <thead>
                    <tr>
                        <th data-name="date">Date</th>
                        <th data-name="amount-nft">Amount NFT</th>
                        <th data-name="amount-dividends">Amount Dividends</th>
                        <th data-name="transaction-id">Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {claimDividendsHistory?.length > 0 ? (
                        claimDividendsHistory.map(({ date, amountNft, amountDividends, transactionId }) => (
                            <tr>
                                <td>{date}</td>
                                <td data-name="amount-sol">{amountNft}</td>
                                <td data-name="amount-nft">{amountDividends}</td>
                                <td>{transactionId}</td>
                            </tr>
                        ))
                    ) : (
                        <tr data-type="empty-row">
                            <td colSpan={4}>No transaction yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export { TableClaimDividendsHistory };
