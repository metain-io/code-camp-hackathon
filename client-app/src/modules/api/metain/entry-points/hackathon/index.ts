import axios from '@api/metain/axios-client';

const BASE_URI = '/hackathon';

export async function getUserDividend() {
    const uri = `${BASE_URI}/get-user-dividend`;
    const requestKey = axios.generateRequestKey(uri);

    const response = await axios.executeRequest(requestKey, () => {
        return axios.get(uri);
    });

    return response.body;
}

export async function getShareDividend() {
    const uri = `${BASE_URI}/get-share-dividend`;
    const requestKey = axios.generateRequestKey(uri);

    const response = await axios.executeRequest(requestKey, () => {
        return axios.get(uri);
    });

    return response.body;
}
