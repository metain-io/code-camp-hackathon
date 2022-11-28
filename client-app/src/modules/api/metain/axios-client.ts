import logger from '@libs/logger';
import Axios from 'axios';
import AuthService from '@auth/services/auth';

const BASE_URL = process.env.NEXT_PUBLIC_METAIN_API_BASE_URL;
const CUSTODIAL_POOL_ID = process.env.NEXT_PUBLIC_CUSTODIAL_IDENTITY_POOL_ID;
const CONFIDENT_POOL_ID = process.env.NEXT_PUBLIC_CONFIDENT_IDENTITY_POOL_ID;

const axios = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: {
        serialize: (param) => new URLSearchParams(param).toString(),
    },
});

axios.interceptors.request.use(
    function onFulfilled(configs) {
        // @ts-ignore
        const userPoolId = AuthService.currentUser?.pool.userPoolId;
        const userSession = AuthService.currentUser?.getSignInUserSession();

        configs.headers = {
            ...configs.headers,
            'x-user-pool': userPoolId == CUSTODIAL_POOL_ID ? 'custodial' : 'decentralized',
            'x-access-token': userSession?.getAccessToken().getJwtToken() || '',
            'x-id-token': userSession?.getIdToken().getJwtToken() || '',
        };

        return configs;
    },

    function onRejected(error) {
        throw error;
    },
);

axios.interceptors.response.use(
    function onFulfilled(response) {
        return transformResponse(response);
    },

    function onRejected(error) {
        throw error;
    },
);

const transformResponse = (response: any) => {
    response = response?.data || response;

    try {
        response = JSON.parse(response);
    } catch (jsonParseResponseError) {
        logger.error('jsonParseResponseError', jsonParseResponseError);
    }

    return response;
};

export default axios;
