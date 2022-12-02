import { useDividendHistory } from './dividend-history';
import styles from './styles.module.scss';

const TableDividendHistory = () => {
    const { dividendHistory } = useDividendHistory();

    return (
        <div className={styles['table-wrapper']}>
            <table>
                <thead>
                    <tr>
                        <th data-name="wallet">Wallet</th>
                        <th data-name="date">Date</th>
                        <th data-name="NFTcount">NFT Count</th>
                        <th data-name="status">status</th>
                    </tr>
                </thead>
                <tbody>
                    {dividendHistory?.length > 0 ? (
                        dividendHistory.map(({ wallet, date, NFTcount, status }, index) => (
                            <tr key={index}>
                                <td>{wallet}</td>
                                <td>{date}</td>
                                <td data-name="amount-sol">{NFTcount}</td>
                                <td data-name="amount-nft">{status}</td>
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

export { TableDividendHistory };
