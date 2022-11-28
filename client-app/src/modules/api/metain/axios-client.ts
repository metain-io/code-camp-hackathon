import Axios from 'axios';

const BASE_URL = '';

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
    } catch (jsonParseResponseError) {}

    return response;
};

export default axios;
