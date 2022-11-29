import { loginActions } from '@auth/redux/login/slice';
import { useDispatch } from 'react-redux';

const useButtonConnectPhantomWallet = () => {
    const dispatch = useDispatch();

    const handleOnClicked = () => {
        dispatch(loginActions.loginWithPhantomWalletRequested());
    };

    return { handleOnClicked };
};

export { useButtonConnectPhantomWallet };
