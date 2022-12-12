import AuthService from '@auth/services/auth';
import logger from '@libs/logger';
import { resolvePromise } from '@libs/utils';
import Axios, { AxiosInstance } from 'axios';
import CryptoJS from 'crypto-js';

const BASE_URL = process.env.NEXT_PUBLIC_METAIN_API_BASE_URL;

const processingRequests: { [key: string]: any } = {};

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
        const userSession = AuthService.currentUser?.getSignInUserSession();

        configs.headers = {
            ...configs.headers,
            'x-user-pool': 'decentralized',
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

(axios as any).executeRequest = async (key: string, request: () => Promise<any>) => {
    if (processingRequests[key]) {
        return await processingRequests[key];
    }

    processingRequests[key] = (async () => {
        let [response, error] = await resolvePromise(request());

        if (error && (error as any).response?.status == 401) {
            [response, error] = await resolvePromise(AuthService.refreshUserSession());

            if (!error) {
                [response, error] = await resolvePromise(retryRequest(request, 2));
            }
        }

        processingRequests[key] = undefined;

        if (response) {
            return response;
        }

        if (error) {
            throw error;
        }
    })();

    return await processingRequests[key];
};

(axios as any).generateRequestKey = (...args: any) => {
    let key = '';

    for (let arg of args) {
        key += JSON.stringify(arg);
    }

    return CryptoJS.MD5(key).toString(CryptoJS.enc.Base64);
};

const transformResponse = (response: any) => {
    response = response?.data || response;

    if (typeof response == 'string') {
        try {
            response = JSON.parse(response);
        } catch (jsonParseResponseError) {
            logger.error('jsonParseResponseError', jsonParseResponseError);
        }
    }

    return response;
};

const retryRequest = async (request: () => Promise<any>, numOfTrial: number = 1, delayTimeEachTry: number = 3000) => {
    for (let i = 0; i < numOfTrial; i++) {
        const [response, error] = await resolvePromise(request());

        if (response) {
            return response;
        }

        if (error && i == numOfTrial - 1) {
            throw error;
        }

        await delay(delayTimeEachTry);
    }
};

const delay = (time: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, time);
    });
};

export default axios as AxiosInstance & {
    executeRequest: (key: string, request: () => Promise<any>) => Promise<any>;
    generateRequestKey: (...args: any) => string;
};
