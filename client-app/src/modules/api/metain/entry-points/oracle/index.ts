import axios from '@api/metain/axios-client';

const BASE_URI = '/oracle';

export async function getExchangeRateList() {
    const uri = `${BASE_URI}/exchange-rate/list`;
    const requestKey = axios.generateRequestKey(uri);

    const response = await axios.executeRequest(requestKey, () => {
        return axios.get(uri);
    });

    return response.body;
}
