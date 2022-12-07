import { getShareDividend, getUserDividend } from '@api/metain/entry-points/hackathon';
import {
    selectUserDividendStatus,
    selectUserTotalUsdClaimableDividend,
    selectUserTotalUsdClaimedDividend,
    userDividendActions,
} from '@business/claim-devidends/redux/user-dividend/slice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useFormClaimDividends = () => {
    const dispatch = useDispatch();
    const userTotalUsdClaimableDividend = useSelector(selectUserTotalUsdClaimableDividend);
    const userTotalUsdClaimedDividend = useSelector(selectUserTotalUsdClaimedDividend);
    const status = useSelector(selectUserDividendStatus);

    React.useEffect(() => {
        dispatch(userDividendActions.initRequested());
    }, []);

    const handleClaimDividends = () => {
        console.log(`handle buy nft`);
    };

    return {
        status,
        userTotalUsdClaimableDividend,
        userTotalUsdClaimedDividend,
        handleClaimDividends,
    };
};

export { useFormClaimDividends };
