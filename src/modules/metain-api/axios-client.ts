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
        return response;
    },

    function onRejected(error) {
        throw error;
    },
);

export default axios;
