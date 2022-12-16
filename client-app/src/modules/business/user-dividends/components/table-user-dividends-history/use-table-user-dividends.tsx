import { UserDividendHistoryItem } from '@api/metain/entry-points/hackathon';
import {
    selectUserDividendData,
    selectUserDividendStatus,
    userDividendActions,
} from '@business/user-dividends/redux/slice';
import WrappedBn from '@libs/wrapped-bn';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type UserDividendInDetailByYear = {
    year: number,
    project: string,
    dividend: WrappedBn,
    nftMin: number,
    nftMax: number,
    dividendPerNFTMin: WrappedBn,
    dividendPerNFTMax: WrappedBn,
    status: string,
}

export type UserDividendHistoryTableItem = {
    dateFrom: number;
    dividenId: string;
    id: string;
    dateTo: number;
    project: string;
    dividend: WrappedBn;
    nft: number;
    dividendPerNFT: WrappedBn;
    status: string;
}

const SOL_DECIMAL = WrappedBn.createFromNumber(Math.pow(10, 6));

const useTableUserDividends = () => {
    const dispatch = useDispatch();
    const userDividensData: Array<UserDividendHistoryItem> = useSelector(selectUserDividendData);
    const status = useSelector(selectUserDividendStatus);

    const [dividendDataInDetail, setDividendDataInDetail] = React.useState<Array<UserDividendHistoryTableItem>>([]);
    const [yearUserDividend, setYearUserDividend] = React.useState<Array<any>>([]);
    const [dividendDataInDetailByYear, setDividendDataInDetailByYear] = React.useState<Array<any>>([]);
    const [dividendDataInDetailWithSpecificMonth, setDividendDataInDetailWithSpecificMonth] = React.useState<Array<UserDividendHistoryTableItem>>([]);
    const [criteria, setCriteria] = React.useState<{
        year: number | undefined,
        month: number | undefined
    }>({
        year: undefined,
        month: undefined
    })

    React.useEffect(() => {
        dispatch(userDividendActions.initRequested());
    }, []);

    React.useEffect(() => {
        // console.log('============== XXX: ', userDividensData)

        if (userDividensData && userDividensData.length > 0) {
            convertUserDividenData2TableData(userDividensData);
        }
    }, [userDividensData]);

    React.useEffect(() => {
        if (dividendDataInDetail && dividendDataInDetail.length > 0) {
            getYearUserDividend(dividendDataInDetail);
        }
    }, [dividendDataInDetail]);

    React.useEffect(() => {
        if (criteria.year != undefined && criteria.month === undefined) {
            getUserDividendByYear(dividendDataInDetail, criteria.year);
        } else if (criteria.year != undefined && criteria.month != undefined) {
            getUserDividendByMonth(dividendDataInDetail, criteria.month, criteria.year);
        }
    }, [criteria]);

    const convertUserDividenData2TableData = (userDividensDataParam: Array<UserDividendHistoryItem>) => {
        const generateEmptyHistoryArray = (minDateParam: moment.Moment, maxDateParam: moment.Moment): Array<UserDividendHistoryTableItem> => {
            // ( minDateParam, maxDateParam ]
            const result: Array<UserDividendHistoryTableItem> = [];
            let currentDate = minDateParam.add(1, 'day');
            let lastDate = maxDateParam;

            while (true) {
                if (compareDate(currentDate, lastDate) !== -1) {
                    result.push({
                        dateFrom: moment(new Date(currentDate.year(), currentDate.month(), currentDate.date())).valueOf(),
                        // date: currentDate.date(),
                        dividenId: '',
                        id: '',
                        dateTo: moment(new Date(currentDate.year(), currentDate.month(), currentDate.date())).valueOf(),
                        project: '',
                        dividend: WrappedBn.ZERO,
                        nft: 0,
                        dividendPerNFT: WrappedBn.ZERO,
                        status: 'available',
                    });
                    currentDate.add(1, 'day');
                } else {
                    break;
                }
            }
            return result;
        }
        const compareDate = (date1: moment.Moment, date2: moment.Moment) => {
            // Only Date, not include time
            // --- RETURN
            // date1 <= date2 === 1
            // date1 = date2 === 0
            // date1 > date2 === -1
            const tmpDate1 = moment(new Date(date1.year(), date1.month() - 1, date1.date()));
            const tmpDate2 = moment(new Date(date2.year(), date2.month() - 1, date2.date()));
            // console.log('================== YYYY: ', {
            //     date1: tmpDate1.date(),
            //     date2: tmpDate2.date(),
            //     rs:
            //         tmpDate1 < tmpDate2
            //             ? 1
            //             : tmpDate1.year() === tmpDate2.year() &&
            //               tmpDate1.month() === tmpDate2.month() &&
            //               tmpDate1.date() === tmpDate2.date()
            //             ? 0
            //             : -1,
            // });
            return tmpDate1 < tmpDate2 
                ? 1 : ((tmpDate1.year() === tmpDate2.year() && tmpDate1.month() === tmpDate2.month() && tmpDate1.date() === tmpDate2.date())
                ? 0 : -1);
        }

        // console.log('============= WWWW: ', userDividensDataParam)

        const tmpUserDividendData = [...userDividensDataParam].sort((item1: any, item2: any) => {
            return (item2?.dateFrom || 0) - (item1.dateFrom || 0) > 0 ? -1 : 1;
        });

        if(tmpUserDividendData && tmpUserDividendData.length === 0) return [];

        const minDate = moment(tmpUserDividendData[0].dateFrom);
        const maxDate = moment(tmpUserDividendData[tmpUserDividendData.length - 1].dateTo);

        const dividendHistoryArray = generateEmptyHistoryArray(minDate, maxDate);
        let tmpUserDividend = undefined;

        dividendHistoryArray.forEach((item, idx) => {
            tmpUserDividend = tmpUserDividendData.find((item1, idx1) => {
                // console.log('============== NNNN: ',item.dateFrom.toString(), item.date, moment(item1.dateFrom).date(), moment(item.dateFrom).date(), moment(item1.dateTo).date());
                let moreThanDateFrom = compareDate(moment(item1.dateFrom), moment(item.dateFrom)) === 1;
                let lessThanDateTo = compareDate(moment(item.dateFrom), moment(item1.dateTo)) !== -1;

                return moreThanDateFrom && lessThanDateTo;
            });

            // console.log('============== XXX: ', {from: item.dateFrom.date(), month: item.dateFrom.month(), tmpUserDividend});

            item.dividenId = tmpUserDividend?.dividenId || '';
            item.id = tmpUserDividend?.id || '';
            item.project = tmpUserDividend?.project || '';
            // item.dividend = Number(BigInt(tmpUserDividend?.dividend || 0) * BigInt(100) / SOL_DECIMAL) / 100;
            item.dividend = WrappedBn.div(WrappedBn.createFromNumber(tmpUserDividend?.dividend || 0), (SOL_DECIMAL));
            item.nft = tmpUserDividend?.nft || 0;
            // item.dividendPerNFT = Number(BigInt(tmpUserDividend?.dividendPerNFT || 0) * BigInt(100) / SOL_DECIMAL) / 100;
            item.dividendPerNFT = WrappedBn.div(WrappedBn.createFromNumber(tmpUserDividend?.dividendPerNFT || 0), (SOL_DECIMAL));
            item.status = tmpUserDividend?.status || 'unknown';
            // item.status = tmpUserDividend?.status.includes('#') ? tmpUserDividend?.status.split('#')[0] : tmpUserDividend?.status || 'unknown';
        })
        // console.log('================== convertUserDividenData2TableData: ', {tmpUserDividendData, dividendHistoryArray, minDate, maxDate})
        setDividendDataInDetail(dividendHistoryArray);
        return dividendHistoryArray;
    }

    const getYearUserDividend = (data: Array<UserDividendHistoryTableItem>) => {
        const rs: Array<UserDividendInDetailByYear> = [];

        if (data && data.length === 0) return rs;

        let years: Array<number> = [];
        data.forEach((item, idx) => {
            let currentYear = moment(item.dateFrom).year();
            if (years.indexOf(currentYear) === -1) {
                years.push(currentYear);
            }
        });
        years.forEach((year, index) => {
            let userDividendItem: UserDividendInDetailByYear = {
                year: year,
                project: '',
                dividend: WrappedBn.ZERO,
                nftMin: data[0].nft,
                nftMax: data[0].nft,
                dividendPerNFTMin: data[0].dividendPerNFT || WrappedBn.ZERO,
                dividendPerNFTMax: data[0].dividendPerNFT || WrappedBn.ZERO,
                status: '',
            };
            data.forEach((item, idx) => {
                if (moment(item.dateFrom).year() === year) {
                    userDividendItem.dividend = WrappedBn.add(userDividendItem.dividend, item.dividend || WrappedBn.ZERO);
                    userDividendItem.project = item.project;
                    userDividendItem.nftMin > item.nft && (userDividendItem.nftMin = item.nft);
                    userDividendItem.nftMax < item.nft && (userDividendItem.nftMax = item.nft);
                    userDividendItem.dividendPerNFTMin.gt(item.dividendPerNFT )&& (userDividendItem.dividendPerNFTMin = item.dividendPerNFT || WrappedBn.ZERO);
                    userDividendItem.dividendPerNFTMax.lt(item.dividendPerNFT) && (userDividendItem.dividendPerNFTMax = item.dividendPerNFT || WrappedBn.ZERO);
                }
            });
            rs.push(userDividendItem);
        });
        setYearUserDividend(rs);
        return rs;
    };

    const getUserDividendByMonth = (data: Array<UserDividendHistoryTableItem>, month: number, year: number) => {
        if (data && data.length === 0) return [];
        const rs = data.filter((item, index) => {
            return moment(item.dateFrom).year() == year && moment(item.dateFrom).month() == month;
        })
        setDividendDataInDetailWithSpecificMonth(rs);
        return rs;
    }

    const getUserDividendByYear = (data: Array<UserDividendHistoryTableItem>, year: number) => {
        if (data && data.length === 0) return [];
        const tmpData = data.filter((item, index) => {
            return moment(item.dateFrom).year() == year;
        })

        const rs: Array<UserDividendInDetailByYear> = [];

        if (tmpData && tmpData.length === 0) return rs;

        let months: Array<number> = [];
        tmpData.forEach((item, idx) => {
            let currentMonth = moment(item.dateFrom).month();
            if (months.indexOf(currentMonth) === -1) {
                months.push(currentMonth);
            }
        });
        months.forEach((month, index) => {
            let userDividendItem: UserDividendInDetailByYear = {
                year: month,
                project: '',
                dividend: WrappedBn.ZERO,
                nftMin: tmpData[0].nft,
                nftMax: tmpData[0].nft,
                dividendPerNFTMin: tmpData[0].dividendPerNFT || WrappedBn.ZERO,
                dividendPerNFTMax: tmpData[0].dividendPerNFT || WrappedBn.ZERO,
                status: '',
            };
            tmpData.forEach((item, idx) => {
                if (moment(item.dateFrom).month() === month) {
                    userDividendItem.dividend = WrappedBn.add(userDividendItem.dividend, item.dividend || WrappedBn.ZERO);
                    userDividendItem.project = item.project;
                    userDividendItem.nftMin > item.nft && (userDividendItem.nftMin = item.nft);
                    userDividendItem.nftMax < item.nft && (userDividendItem.nftMax = item.nft);
                    userDividendItem.dividendPerNFTMin.gt(item.dividendPerNFT) && (userDividendItem.dividendPerNFTMin = item.dividendPerNFT || WrappedBn.ZERO);
                    userDividendItem.dividendPerNFTMax.lt(item.dividendPerNFT) && (userDividendItem.dividendPerNFTMax = item.dividendPerNFT || WrappedBn.ZERO);
                }
            });
            rs.push(userDividendItem);
        });
        setDividendDataInDetailByYear(rs);

        return rs;
    }

    return {
        status,
        userDividensData,
        yearUserDividend,
        dividendDataInDetail,
        dividendDataInDetailByYear,
        dividendDataInDetailWithSpecificMonth,
        criteria,
        setCriteria
    };
};

export { useTableUserDividends };
