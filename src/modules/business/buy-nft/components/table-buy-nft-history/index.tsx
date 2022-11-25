import { useBuyNftHistory } from './use-buy-nft-history';
import styles from './styles.module.scss';

const TableBuyNftHistory = () => {
    const { buyNftHistory } = useBuyNftHistory();

    return (
        <div className={styles['table-wrapper']}>
            <table>
                <thead>
                    <tr>
                        <th data-name="date">Date</th>
                        <th data-name="amount-sol">Amount Sol</th>
                        <th data-name="amount-nft">Amount NFT</th>
                        <th data-name="transaction-id">Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {buyNftHistory?.length > 0 ? (
                        buyNftHistory.map(({ date, amountSol, amountNft, transactionId }, index) => (
                            <tr key={index}>
                                <td>{date}</td>
                                <td data-name="amount-sol">{amountSol}</td>
                                <td data-name="amount-nft">{amountNft}</td>
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

export { TableBuyNftHistory };
