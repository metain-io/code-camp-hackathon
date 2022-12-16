import {
    selectUserDividendData,
    selectUserDividendStatus,
    userDividendActions,
} from '@business/user-dividends/redux/slice';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WrappedBn from '@libs/wrapped-bn';
import BN from 'bn.js';

const DECIMALS = 6;

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
            let { dateFrom, dateTo, nft, dividend, project, status } = item;

            const from = moment(dateFrom);
            const to = moment(dateTo);
            const dayDiff = to.startOf('day').diff(from.startOf('day'), 'days', false);
            const bnDividend = WrappedBn.createFromBn(new BN(dividend), DECIMALS);
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
                    treeData[year] = {
                        nft: 0,
                        projects: new Set(),
                        claimedDividend: WrappedBn.createFromNumber(0),
                        claimableDividend: WrappedBn.createFromNumber(0),
                    };
                }

                if (!treeData[year][month]) {
                    treeData[year][month] = {
                        nft: 0,
                        projects: new Set(),
                        claimedDividend: WrappedBn.createFromNumber(0),
                        claimableDividend: WrappedBn.createFromNumber(0),
                    };
                }

                if (!treeData[year][month][date]) {
                    treeData[year][month][date] = {
                        nft: 0,
                        projects: new Set(),
                        claimedDividend: WrappedBn.createFromNumber(0),
                        claimableDividend: WrappedBn.createFromNumber(0),
                    };
                }

                const shouldUpdateGraphOfYear = prevYear != year;
                treeData[year].nft += shouldUpdateGraphOfYear ? nft : 0;
                shouldUpdateGraphOfYear && treeData[year].projects.add(project);
                treeData[year].claimedDividend.add(
                    shouldUpdateGraphOfYear && status == 'claimed' ? bnDividend : WrappedBn.ZERO,
                );
                treeData[year].claimableDividend.add(
                    shouldUpdateGraphOfYear && status == 'available' ? bnDividend : WrappedBn.ZERO,
                );

                const shouldUpdateGraphOfMonth = prevYear != year && prevMonth != month;
                treeData[year][month].nft += shouldUpdateGraphOfMonth ? nft : 0;
                shouldUpdateGraphOfMonth && treeData[year][month].projects.add(project);
                treeData[year][month].claimedDividend.add(
                    shouldUpdateGraphOfMonth && status == 'claimed' ? bnDividend : WrappedBn.ZERO,
                );
                treeData[year][month].claimableDividend.add(
                    shouldUpdateGraphOfMonth && status == 'available' ? bnDividend : WrappedBn.ZERO,
                );

                treeData[year][month][date].nft += nft;
                treeData[year][month][date].projects.add(project);
                treeData[year][month][date].claimedDividend.add(status == 'claimed' ? bnDividend : WrappedBn.ZERO);
                treeData[year][month][date].claimableDividend.add(status == 'available' ? bnDividend : WrappedBn.ZERO);

                prevYear = year;
                prevMonth = month;
            }
        });

        // console.log(treeData);
        return treeData;
    }, [userDividensData]);

    const currentUserDividendBranchData = React.useMemo(() => {
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
