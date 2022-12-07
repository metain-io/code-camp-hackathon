import {
    selectUserDividendData,
    selectUserDividendStatus,
    userDividendActions,
} from '@business/user-dividends/redux/slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useTableUserDividends = () => {
    const dispatch = useDispatch();
    const userDividensData = useSelector(selectUserDividendData);
    const status = useSelector(selectUserDividendStatus);

    React.useEffect(() => {
        dispatch(userDividendActions.initRequested());
    }, []);

    return {
        status,
        userDividensData,
    };
};

export { useTableUserDividends };
