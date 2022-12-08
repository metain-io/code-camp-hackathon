import { UserDividendStatus } from '@business/user-dividends/redux/slice';
import moment from 'moment';
import Link from 'next/link';
import styles from './styles.module.scss';
import { UserDividendInDetailByYear, useTableUserDividends } from './use-table-user-dividends';

const YearUserDividendTable = (props: any) => {
    const { status, yearUserDividend, criteria, setCriteria } = props;

    return (
        <div className={styles['table-dividend-history-wrapper']}>
            <table>
                <thead>
                    <tr>
                        <th data-name="from">YEAR</th>
                        <th data-name="project">PROJECT</th>
                        <th data-name="amount-nft">AMOUNT NFT (In Range)</th>
                        <th data-name="amount-nft">NFT PRICE (In Range)</th>
                        <th data-name="amount-dividend">AMOUNT DIVIDEND</th>
                        {/* <th data-name="status">STATUS</th> */}
                    </tr>
                </thead>
                <tbody>
                    {status != UserDividendStatus.Loading && yearUserDividend && yearUserDividend.length > 0 ? (
                        yearUserDividend.map((item: UserDividendInDetailByYear, idx: number) => (
                            <tr key={idx}>
                                <td data-name="from">
                                    <Link
                                        href=""
                                        onClick={() => {
                                            setCriteria({ ...criteria, year: item.year });
                                        }}
                                    >
                                        {item.year}
                                    </Link>
                                </td>
                                <td data-name="project">{item.project}</td>
                                <td data-name="amount-nft">{`${item.nftMin} - ${item.nftMax}`}</td>
                                <td data-name="amount-nft">{`${item.dividendPerNFTMin} - ${item.dividendPerNFTMax}`}</td>
                                <td data-name="amount-dividend">{item.dividend} US$</td>
                                {/* <td data-name="status" data-value={status}>
                                    {status}
                                </td> */}
                            </tr>
                        ))
                    ) : status == UserDividendStatus.Loading ? (
                        <tr data-type="empty-row">
                            <td colSpan={6}>Loading...</td>
                        </tr>
                    ) : (
                        <tr data-type="empty-row">
                            <td colSpan={6}>No transaction yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const MonthUserDividendTable = (props: any) => {
    const { status, data, criteria, setCriteria } = props;

    return (
        <div>
            <button onClick={() => {
                    setCriteria({ month: undefined, year: undefined });
                }}
            >
                Back to Year table
            </button>
            <div className={styles['table-dividend-history-wrapper']}>
                <table>
                    <thead>
                        <tr>
                            <th data-name="from">MONTH</th>
                            <th data-name="project">PROJECT</th>
                            <th data-name="amount-nft">AMOUNT NFT (In Range)</th>
                            <th data-name="amount-nft">NFT PRICE (In Range)</th>
                            <th data-name="amount-dividend">AMOUNT DIVIDEND</th>
                            {/* <th data-name="status">STATUS</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {status != UserDividendStatus.Loading && data && data.length > 0 ? (
                            data.map((item: UserDividendInDetailByYear, idx: number) => (
                                <tr key={idx}>
                                    <td data-name="from">
                                        <Link
                                            href=""
                                            onClick={() => {
                                                setCriteria({ ...criteria, month: item.year });
                                            }}
                                        >
                                            {item.year + 1}
                                        </Link>
                                    </td>
                                    <td data-name="project">{item.project}</td>
                                    <td data-name="amount-nft">{`${item.nftMin} - ${item.nftMax}`}</td>
                                    <td data-name="amount-nft">{`${item.dividendPerNFTMin} - ${item.dividendPerNFTMax}`}</td>
                                    <td data-name="amount-dividend">{item.dividend} US$</td>
                                    {/* <td data-name="status" data-value={status}>
                                        {status}
                                    </td> */}
                                </tr>
                            ))
                        ) : status == UserDividendStatus.Loading ? (
                            <tr data-type="empty-row">
                                <td colSpan={6}>Loading...</td>
                            </tr>
                        ) : (
                            <tr data-type="empty-row">
                                <td colSpan={6}>No transaction yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const DayUserDividendTable = (props: any) => {
    const { status, dividendDataInDetailWithSpecificMonth, setCriteria, criteria } = props;

    return (
        <div>
            <button
                onClick={() => {
                    setCriteria({ ...criteria, month: undefined });
                }}
            >
                Back to Month table
            </button>
            <div className={styles['table-dividend-history-wrapper']}>
                <table>
                    <thead>
                        <tr>
                            <th data-name="from">DATE</th>
                            <th data-name="project">PROJECT</th>
                            {/* <th data-name="to">TO</th> */}
                            <th data-name="amount-nft">AMOUNT NFT</th>
                            <th data-name="amount-dividend">AMOUNT DIVIDEND</th>
                            <th data-name="status">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status != UserDividendStatus.Loading && dividendDataInDetailWithSpecificMonth?.length > 0 ? (
                            dividendDataInDetailWithSpecificMonth.map(
                                ({ id, project, dateFrom, dateTo, nft, dividend, status }: any, idx: number) => (
                                    <tr key={idx}>
                                        <td data-name="from">
                                            {dateFrom && moment(dateFrom).format('DD - MM - YYYY')}
                                        </td>
                                        <td data-name="project">{project}</td>
                                        {/* <td data-name="to">{dateTo && moment(dateTo).format('DD - MM - YYYY')}</td> */}
                                        <td data-name="amount-nft">{nft}</td>
                                        <td data-name="amount-dividend">{dividend} US$</td>
                                        <td data-name="status" data-value={status}>
                                            {status}
                                        </td>
                                    </tr>
                                ),
                            )
                        ) : status == UserDividendStatus.Loading ? (
                            <tr data-type="empty-row">
                                <td colSpan={6}>Loading...</td>
                            </tr>
                        ) : (
                            <tr data-type="empty-row">
                                <td colSpan={6}>No transaction yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const TableUserDividendHistory = () => {
    const {
        status,
        dividendDataInDetailByYear,
        criteria,
        dividendDataInDetailWithSpecificMonth,
        yearUserDividend,
        setCriteria
    } = useTableUserDividends();

    return (
        <>
            {criteria.year === undefined && criteria.month === undefined ? (
                <YearUserDividendTable
                    status={status}
                    yearUserDividend={yearUserDividend}
                    setCriteria={setCriteria}
                    criteria={criteria}
                />
            ) : criteria.year != undefined && criteria.month === undefined ? (
                <MonthUserDividendTable
                    status={status}
                    data={dividendDataInDetailByYear}
                    criteria={criteria}
                    setCriteria={setCriteria}
                />
            ) : (
                <DayUserDividendTable
                    status={status}
                    dividendDataInDetailWithSpecificMonth={dividendDataInDetailWithSpecificMonth}
                    setCriteria={setCriteria}
                    criteria={criteria}
                />
            )}
        </>
    );
};

export { TableUserDividendHistory };
