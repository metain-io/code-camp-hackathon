import {
    selectUserDividendData,
    selectUserDividendStatus,
    userDividendActions,
} from '@business/user-dividends/redux/slice';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useTableUserDividendsStatistics = () => {
    const dispatch = useDispatch();
    const userDividensData = useSelector(selectUserDividendData);
    const status = useSelector(selectUserDividendStatus);
    const [branchPath, setBranchPath] = React.useState<Array<number>>([]);

    React.useEffect(() => {
        dispatch(userDividendActions.initRequested());
    }, []);

    const userDividendTreeData = React.useMemo(() => {
        if (!userDividensData) {
            return null;
        }

        const treeData: any = {};

        userDividensData.forEach((item: any) => {
            const { dateFrom, dateTo, nft, dividend, status } = item;

            const from = moment(dateFrom);
            const to = moment(dateTo);
            const dayDiff = to.startOf('day').diff(from.startOf('day'), 'days', false);
            // console.log({ from: from.format('YYYY - MM - DD'), to: to.format('YYYY - MM - DD'), dayDiff });

            let prevYear = undefined;
            let prevMonth = undefined;
            for (let i = 0; i <= dayDiff; i++) {
                const calculatingDate = from.clone().add(i, 'days');
                // console.log(calculatingDate.format('YYYY - MM - DD'), i + 1);

                const year = calculatingDate.get('year');
                const month = calculatingDate.get('month') + 1;
                const date = calculatingDate.get('date');
                // console.log(year, month, date, { nft, dividend, status });

                if (!treeData[year]) {
                    treeData[year] = { nft: 0, claimedDividend: 0, claimableDividend: 0 };
                }
                if (!treeData[year][month]) {
                    treeData[year][month] = { nft: 0, claimedDividend: 0, claimableDividend: 0 };
                }
                if (!treeData[year][month][date]) {
                    treeData[year][month][date] = { nft: 0, claimedDividend: 0, claimableDividend: 0 };
                }

                const shouldUpdateGraphOfYear = prevYear != year;
                treeData[year].nft += shouldUpdateGraphOfYear ? nft : 0;
                treeData[year].claimedDividend += shouldUpdateGraphOfYear && status == 'claimed' ? dividend : 0;
                treeData[year].claimableDividend += shouldUpdateGraphOfYear && status == 'available' ? dividend : 0;

                const shouldUpdateGraphOfMonth = prevYear != year && prevMonth != month;
                treeData[year][month].nft += shouldUpdateGraphOfMonth ? nft : 0;
                treeData[year][month].claimedDividend += shouldUpdateGraphOfMonth && status == 'claimed' ? dividend : 0;
                treeData[year][month].claimableDividend +=
                    shouldUpdateGraphOfMonth && status == 'available' ? dividend : 0;

                treeData[year][month][date].nft += nft;
                treeData[year][month][date].claimedDividend += status == 'claimed' ? dividend : 0;
                treeData[year][month][date].claimableDividend += status == 'available' ? dividend : 0;

                prevYear = year;
                prevMonth = month;
            }
        });

        console.log(treeData);
        return treeData;
    }, [userDividensData]);

    const currentUserDividendBranchData = React.useMemo(() => {
        console.log('aaaa', branchPath);
        let branch = userDividendTreeData;

        for (let i = 0; i < branchPath.length; ++i) {
            branch = branch?.[branchPath[i]];
        }

        return branch;
    }, [userDividendTreeData, branchPath]);

    const popBranchPath = () => {
        branchPath.pop();
        setBranchPath([...branchPath]);
    };

    const pushBranchPath = (key: any) => {
        if (branchPath.length >= 2) {
            return;
        }

        branchPath.push(key);
        setBranchPath([...branchPath]);
    };

    return {
        status,
        branchPath,
        currentUserDividendBranchData,
        popBranchPath,
        pushBranchPath,
    };
};

export { useTableUserDividendsStatistics };
