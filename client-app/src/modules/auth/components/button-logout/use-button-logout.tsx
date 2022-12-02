import { loginActions } from '@auth/redux/login/slice';
import { useDispatch } from 'react-redux';

const useButtonLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(loginActions.logoutRequested());
    };

    return {
        handleLogout,
    };
};

export { useButtonLogout };
