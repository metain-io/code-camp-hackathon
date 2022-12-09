import { UserDividendHistoryItem } from '@api/metain/entry-points/hackathon';
import {
    selectUserDividendData,
    selectUserDividendStatus,
    userDividendActions,
} from '@business/user-dividends/redux/slice';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type UserDividendInDetailByYear = {
    year: number,
    project: string,
    dividend: number,
    nftMin: number,
    nftMax: number,
    dividendPerNFTMin: number,
    dividendPerNFTMax: number,
    status: string,
}

const SOL_DECIMAL = BigInt(Math.pow(10, 6));

const useTableUserDividends = () => {
    const dispatch = useDispatch();
    const userDividensData: Array<UserDividendHistoryItem> = useSelector(selectUserDividendData);
    const status = useSelector(selectUserDividendStatus);

    const [dividendDataInDetail, setDividendDataInDetail] = React.useState<Array<UserDividendHistoryItem>>([]);
    const [yearUserDividend, setYearUserDividend] = React.useState<Array<any>>([]);
    const [dividendDataInDetailByYear, setDividendDataInDetailByYear] = React.useState<Array<any>>([]);
    const [dividendDataInDetailWithSpecificMonth, setDividendDataInDetailWithSpecificMonth] = React.useState<Array<UserDividendHistoryItem>>([]);
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
        const generateEmptyHistoryArray = (minDateParam: moment.Moment, maxDateParam: moment.Moment): Array<UserDividendHistoryItem> => {
            // ( minDateParam, maxDateParam ]
            const result: Array<UserDividendHistoryItem> = [];
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
                        dividend: 0,
                        nft: 0,
                        dividendPerNFT: 0,
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
            item.dividend = Number(BigInt(tmpUserDividend?.dividend || 0) * BigInt(100) / SOL_DECIMAL) / 100;
            item.nft = tmpUserDividend?.nft || 0;
            item.dividendPerNFT = Number(BigInt(tmpUserDividend?.dividendPerNFT || 0) * BigInt(100) / SOL_DECIMAL) / 100;
            item.status = tmpUserDividend?.status || 'unknown';
        })
        // console.log('================== convertUserDividenData2TableData: ', {tmpUserDividendData, dividendHistoryArray, minDate, maxDate})
        setDividendDataInDetail(dividendHistoryArray);
        return dividendHistoryArray;
    }

    const getYearUserDividend = (data: Array<UserDividendHistoryItem>) => {
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
                dividend: 0,
                nftMin: data[0].nft,
                nftMax: data[0].nft,
                dividendPerNFTMin: data[0].dividendPerNFT,
                dividendPerNFTMax: data[0].dividendPerNFT,
                status: '',
            };
            data.forEach((item, idx) => {
                if (moment(item.dateFrom).year() === year) {
                    userDividendItem.dividend += item.dividend || 0;
                    userDividendItem.project = item.project;
                    userDividendItem.nftMin > item.nft && (userDividendItem.nftMin = item.nft);
                    userDividendItem.nftMax < item.nft && (userDividendItem.nftMax = item.nft);
                    userDividendItem.dividendPerNFTMin > item.dividendPerNFT && (userDividendItem.dividendPerNFTMin = item.dividendPerNFT);
                    userDividendItem.dividendPerNFTMax < item.dividendPerNFT && (userDividendItem.dividendPerNFTMax = item.dividendPerNFT);
                }
            });
            rs.push(userDividendItem);
        });
        setYearUserDividend(rs);
        return rs;
    };

    const getUserDividendByMonth = (data: Array<UserDividendHistoryItem>, month: number, year: number) => {
        if (data && data.length === 0) return [];
        const rs = data.filter((item, index) => {
            return moment(item.dateFrom).year() == year && moment(item.dateFrom).month() == month;
        })
        setDividendDataInDetailWithSpecificMonth(rs);
        return rs;
    }

    const getUserDividendByYear = (data: Array<UserDividendHistoryItem>, year: number) => {
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
                dividend: 0,
                nftMin: tmpData[0].nft,
                nftMax: tmpData[0].nft,
                dividendPerNFTMin: tmpData[0].dividendPerNFT,
                dividendPerNFTMax: tmpData[0].dividendPerNFT,
                status: '',
            };
            tmpData.forEach((item, idx) => {
                if (moment(item.dateFrom).month() === month) {
                    userDividendItem.dividend += item.dividend || 0;
                    userDividendItem.project = item.project;
                    userDividendItem.nftMin > item.nft && (userDividendItem.nftMin = item.nft);
                    userDividendItem.nftMax < item.nft && (userDividendItem.nftMax = item.nft);
                    userDividendItem.dividendPerNFTMin > item.dividendPerNFT && (userDividendItem.dividendPerNFTMin = item.dividendPerNFT);
                    userDividendItem.dividendPerNFTMax < item.dividendPerNFT && (userDividendItem.dividendPerNFTMax = item.dividendPerNFT);
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
