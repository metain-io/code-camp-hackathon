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
            let { dateFrom, dateTo, nft, dividend, dividendPerNFT, project, status } = item;

            const from = moment(dateFrom);
            const to = moment(dateTo);
            const dayDiff = to.startOf('day').diff(from.startOf('day'), 'days', false);
            const bnDividend = WrappedBn.createFromBn(new BN(dividend), DECIMALS);
            const bnDividendPerNft = WrappedBn.createFromBn(new BN(dividendPerNFT), DECIMALS);
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
                    treeData[year] = new NodeData();
                }

                if (!treeData[year][month]) {
                    treeData[year][month] = new NodeData();
                }

                if (!treeData[year][month][date]) {
                    treeData[year][month][date] = new NodeData();
                }

                const nodeYear = treeData[year];
                const shouldUpdateGraphOfYear = prevYear != year;
                shouldUpdateGraphOfYear && nodeYear.projects.add(project);
                nodeYear.amountNft += shouldUpdateGraphOfYear ? nft : 0;
                nodeYear.amountNftMin = nodeYear.amountNftMin ? Math.min(nft, nodeYear.amountNftMin) : nft;
                nodeYear.amountNftMax = nodeYear.amountNftMax ? Math.max(nft, nodeYear.amountNftMax) : nft;
                nodeYear.amountDividend.add(shouldUpdateGraphOfYear ? bnDividend : WrappedBn.ZERO);
                nodeYear.dividendPerNftMin =
                    nodeYear.dividendPerNftMin && bnDividendPerNft.gte(nodeYear.dividendPerNftMin)
                        ? nodeYear.dividendPerNftMin
                        : bnDividendPerNft;
                nodeYear.dividendPerNftMax =
                    nodeYear.dividendPerNftMax && bnDividendPerNft.lte(nodeYear.dividendPerNftMax)
                        ? nodeYear.dividendPerNftMax
                        : bnDividendPerNft;

                const nodeMonth = treeData[year][month];
                const shouldUpdateGraphOfMonth = prevYear != year && prevMonth != month;
                shouldUpdateGraphOfMonth && nodeMonth.projects.add(project);
                nodeMonth.amountNft += shouldUpdateGraphOfMonth ? nft : 0;
                nodeMonth.amountNftMin = nodeMonth.amountNftMin ? Math.min(nft, nodeMonth.amountNftMin) : nft;
                nodeMonth.amountNftMax = nodeMonth.amountNftMax ? Math.max(nft, nodeMonth.amountNftMax) : nft;
                nodeMonth.amountDividend.add(shouldUpdateGraphOfMonth ? bnDividend : WrappedBn.ZERO);
                nodeMonth.dividendPerNftMin =
                    nodeMonth.dividendPerNftMin && bnDividendPerNft.gte(nodeMonth.dividendPerNftMin)
                        ? nodeMonth.dividendPerNftMin
                        : bnDividendPerNft;
                nodeMonth.dividendPerNftMax =
                    nodeMonth.dividendPerNftMax && bnDividendPerNft.lte(nodeMonth.dividendPerNftMax)
                        ? nodeMonth.dividendPerNftMax
                        : bnDividendPerNft;

                const nodeDate = treeData[year][month][date];
                nodeDate.projects.add(project);
                nodeDate.amountNft += nft;
                nodeDate.amountNftMin = nodeDate.amountNftMin ? Math.min(nft, nodeDate.amountNftMin) : nft;
                nodeDate.amountNftMax = nodeDate.amountNftMax ? Math.max(nft, nodeDate.amountNftMax) : nft;
                nodeDate.amountDividend.add(bnDividend);
                nodeDate.dividendPerNftMin =
                    nodeDate.dividendPerNftMin && bnDividendPerNft.gte(nodeDate.dividendPerNftMin)
                        ? nodeDate.dividendPerNftMin
                        : bnDividendPerNft;
                nodeDate.dividendPerNftMax =
                    nodeDate.dividendPerNftMax && bnDividendPerNft.lte(nodeDate.dividendPerNftMax)
                        ? nodeDate.dividendPerNftMax
                        : bnDividendPerNft;

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

class NodeData {
    projects: Set<string>;

    amountNft: number;
    amountNftMin?: number;
    amountNftMax?: number;

    amountDividend: WrappedBn;

    dividendPerNftMin?: WrappedBn;
    dividendPerNftMax?: WrappedBn;

    constructor() {
        this.projects = new Set<string>();

        this.amountNft = 0;
        this.amountNftMin = undefined;
        this.amountNftMax = undefined;

        this.amountDividend = WrappedBn.createFromNumber(0);

        this.dividendPerNftMin = undefined;
        this.dividendPerNftMax = undefined;
    }
}

export { useTableUserDividendsStatistics };
