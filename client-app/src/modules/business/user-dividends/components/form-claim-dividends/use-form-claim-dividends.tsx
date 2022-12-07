import {
    selectUserDividendError,
    selectUserDividendStatus,
    selectUserTotalUsdClaimableDividend,
    selectUserTotalUsdClaimedDividend,
    userDividendActions,
    UserDividendStatus,
} from '@business/user-dividends/redux/slice';
import { useNotify } from '@shared/hooks';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useFormClaimDividends = () => {
    const dispatch = useDispatch();
    const { showToast } = useNotify();
    const userTotalUsdClaimableDividend = useSelector(selectUserTotalUsdClaimableDividend);
    const userTotalUsdClaimedDividend = useSelector(selectUserTotalUsdClaimedDividend);
    const status = useSelector(selectUserDividendStatus);
    const error = useSelector(selectUserDividendError);

    React.useEffect(() => {
        dispatch(userDividendActions.initRequested());
    }, []);

    React.useEffect(() => {
        if (status == UserDividendStatus.ClaimDividendFailed) {
            showToast({
                status: 'error',
                message: error,
            });
        } else if (status == UserDividendStatus.ClaimDividendSucceeded) {
            showToast({
                status: 'success',
                message: 'Claim dividend successful',
            });

            dispatch(userDividendActions.initRequested());
        }
    }, [status]);

    const handleClaimDividends = () => {
        console.log(`handle buy nft`);
        dispatch(userDividendActions.claimDividendRequested());
    };

    return {
        status,
        userTotalUsdClaimableDividend,
        userTotalUsdClaimedDividend,
        handleClaimDividends,
    };
};

export { useFormClaimDividends };
