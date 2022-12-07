import {
    selectUserDividendData,
    selectUserDividendStatus,
    userDividendActions,
} from '@business/claim-devidends/redux/user-dividend/slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useClaimDividendsHistory = () => {
    const dispatch = useDispatch();
    const claimDividendsHistory = useSelector(selectUserDividendData);
    const status = useSelector(selectUserDividendStatus);

    React.useEffect(() => {
        dispatch(userDividendActions.initRequested());
    }, []);

    return {
        status,
        claimDividendsHistory,
    };
};

export { useClaimDividendsHistory };
