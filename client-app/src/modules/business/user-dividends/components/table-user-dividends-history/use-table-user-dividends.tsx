import { UserDividendHistoryItem } from '@api/metain/entry-points/hackathon';
import {
    selectUserDividendData,
    selectUserDividendStatus,
    userDividendActions,
} from '@business/user-dividends/redux/slice';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useTableUserDividends = () => {
    const dispatch = useDispatch();
    const userDividensData: Array<UserDividendHistoryItem> = useSelector(selectUserDividendData);
    const status = useSelector(selectUserDividendStatus);

    React.useEffect(() => {
        dispatch(userDividendActions.initRequested());
    }, []);

    React.useEffect(() => {
        console.log('============== XXX: ', userDividensData)

        if (userDividensData && userDividensData.length > 0) {
            convertUserDividenData2TableData(userDividensData);
        }
    }, [userDividensData])

    const convertUserDividenData2TableData = (userDividensDataParam: Array<UserDividendHistoryItem>) => {
        const generateEmptyHistoryArray = (minDateParam: moment.Moment, maxDateParam: moment.Moment) => {
            // ( minDateParam, maxDateParam ]
            const result = [];
            let currentDate = minDateParam;
            currentDate.add(1, 'day');

            while (true) {
                if (
                    currentDate.year() <= maxDateParam.year() &&
                    currentDate.month() <= maxDateParam.month() &&
                    currentDate.date() <= maxDateParam.date()
                ) {
                    result.push({
                        dateFrom: currentDate,
                        dividenId: '',
                        id: '',
                        dateTo: currentDate,
                        project: '',
                        dividend: 0,
                        nft: 0,
                        dividendEachNFT: 0,
                        status: 'available'
                    })
                    currentDate.add(1, 'day')
                } else {
                    break;
                }
            }
            return result;
        }
        const compareDate = (date1: moment.Moment, date2: moment.Moment) => {
            // Only Date, not include time
            // date1 <= date2 true
            // date1 > date2 false
            const tmpDate1 = moment(new Date(date1.year(), date1.month() - 1, date1.date()));
            const tmpDate2 = moment(new Date(date2.year(), date2.month() - 1, date2.date()));
            return tmpDate1 < tmpDate2 
                ? 1 : tmpDate1 === tmpDate2 
                ? 0 : -1;
        }

        const tmpUserDividensData = userDividensDataParam.sort((item1: any, item2: any) => {
            return (item2?.dateFrom || 0) - (item1.dateFrom || 0) > 0 ? -1 : 1;
        });
        const minDate = moment(tmpUserDividensData[0].dateFrom);
        const maxDate = moment(tmpUserDividensData[tmpUserDividensData.length - 1].dateTo);

        const dividendHistoryArray = generateEmptyHistoryArray(minDate, maxDate);

        dividendHistoryArray.forEach((item, idx) => {
            const userDividend = tmpUserDividensData.find((item1, idx1) => {
                return compareDate(moment(item1.dateFrom), moment(item.dateFrom));
            });

            // if (
            //     currentDate.year() <= maxDateParam.year() &&
            //     currentDate.month() <= maxDateParam.month() &&
            //     currentDate.date() <= maxDateParam.date()
            // ) {

            // }
        })
        console.log('================== convertUserDividenData2TableData: ', {tmpUserDividensData, dividendHistoryArray, minDate, maxDate})
    }

    return {
        status,
        userDividensData,
    };
};

export { useTableUserDividends };
