import { UserDividendStatus } from '@business/user-dividends/redux/slice';
import { formatNumber } from '@libs/utils';
import moment from 'moment';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useTableUserDividendsStatistics } from './use-table-user-dividends-statistics';

const TableUserDividendsStatistics = () => {
    const { status, currentUserDividendBranchData, branchPath, popBranchPath, pushBranchPath } =
        useTableUserDividendsStatistics();

    const onBackClicked = () => {
        popBranchPath();
    };

    const onItemClicked = (key: any) => {
        pushBranchPath(key);
    };

    return (
        <>
            {branchPath?.length > 0 && (
                <button className={[styles.button_1, 'mButton mButton-cn1-bp5'].join(' ')} onClick={onBackClicked}>
                    <i className="fml fm-arrow-left" />
                    Back to detail of {branchPath.join(' - ')}
                </button>
            )}
            <div className={styles['table-wrapper']}>
                <table>
                    <thead>
                        <tr>
                            <th data-name="date">YEAR</th>
                            <th data-name="project">PROJECT</th>
                            <th data-name="nft-owned">AMOUNT NFT (in range)</th>
                            <th data-name="claimed-dividend">DIVIDEND PER NFT (in range)</th>
                            <th data-name="claimable-dividend">AMOUNT DIVIDEND</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status != UserDividendStatus.Loading &&
                        currentUserDividendBranchData &&
                        Object.keys(currentUserDividendBranchData).length > 0 ? (
                            Object.keys(currentUserDividendBranchData)
                                .filter((key) => !isNaN(+key))
                                .map((key) => {
                                    const {
                                        projects,
                                        amountNftMin,
                                        amountNftMax,
                                        amountDividend,
                                        dividendPerNftMin,
                                        dividendPerNftMax,
                                    } = currentUserDividendBranchData[key];

                                    return (
                                        <tr key={key}>
                                            <td
                                                data-name="date"
                                                onClick={() => {
                                                    onItemClicked(key);
                                                }}
                                            >
                                                <Link href="">{[...branchPath, key].join(' - ')}</Link>
                                            </td>
                                            <td data-name="project">{[...projects].join(', ')}</td>
                                            <td data-name="nft-owned">
                                                {amountNftMin == amountNftMax
                                                    ? amountNftMin
                                                    : `${amountNftMin} - ${amountNftMax}`}
                                            </td>
                                            <td data-name="claimed-dividend">
                                                {dividendPerNftMin.eq(dividendPerNftMax)
                                                    ? dividendPerNftMin.format()
                                                    : `${dividendPerNftMin.format()} - ${dividendPerNftMax.format()}`}{' '}
                                                US$
                                            </td>
                                            <td data-name="claimable-dividend">
                                                {amountDividend && amountDividend.format()} US$
                                            </td>
                                        </tr>
                                    );
                                })
                        ) : status == UserDividendStatus.Loading ? (
                            <tr data-type="empty-row">
                                <td colSpan={5}>Loading...</td>
                            </tr>
                        ) : (
                            <tr data-type="empty-row">
                                <td colSpan={5}>No transaction yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export { TableUserDividendsStatistics };
