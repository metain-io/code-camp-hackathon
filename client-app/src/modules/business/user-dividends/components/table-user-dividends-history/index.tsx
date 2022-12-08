import { UserDividendStatus } from '@business/user-dividends/redux/slice';
import moment from 'moment';
import styles from './styles.module.scss';
import { useTableUserDividends } from './use-table-user-dividends';

const TableUserDividendHistory = () => {
    const { status, userDividensData } = useTableUserDividends();

    return (
        <div className={styles['table-dividend-history-wrapper']}>
            <table>
                <thead>
                    <tr>
                        <th data-name="id">ID</th>
                        <th data-name="project">PROJECT</th>
                        <th data-name="from">FROM</th>
                        <th data-name="to">TO</th>
                        <th data-name="amount-nft">AMOUNT NFT</th>
                        <th data-name="amount-dividend">AMOUNT DIVIDEND</th>
                        <th data-name="status">STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {status != UserDividendStatus.Loading && userDividensData?.length > 0 ? (
                        userDividensData.map(({ id, project, dateFrom, dateTo, nft, dividend, status }: any) => (
                            <tr key={id}>
                                <td data-name="id">#{id}</td>
                                <td data-name="project">{project}</td>
                                <td data-name="from">{dateFrom && moment(dateFrom).format('DD - MM - YYYY')}</td>
                                <td data-name="to">{dateTo && moment(dateTo).format('DD - MM - YYYY')}</td>
                                <td data-name="amount-nft">{nft}</td>
                                <td data-name="amount-dividend">{dividend} US$</td>
                                <td data-name="status" data-value={status}>
                                    {status}
                                </td>
                            </tr>
                        ))
                    ) : status == UserDividendStatus.Loading ? (
                        <tr data-type="empty-row">
                            <td colSpan={7}>Loading...</td>
                        </tr>
                    ) : (
                        <tr data-type="empty-row">
                            <td colSpan={7}>No transaction yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export { TableUserDividendHistory };
