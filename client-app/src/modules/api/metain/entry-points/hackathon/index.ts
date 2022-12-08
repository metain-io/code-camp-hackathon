import axios from '@api/metain/axios-client';

const BASE_URI = '/hackathon';

export type UserDividendHistoryItem = {
    dateFrom: number;
    dividenId: string;
    id: string;
    dateTo: number;
    project: string;
    dividend: number;
    nft: number;
    dividendPerNFT: number;
    status: string;
};

export async function getUserDividend() {
    /*
        dateFrom:1667260801000,
        dividenId:"1",
        dateTo:1668124801000,
        project:"VOT01",
        dividend:20,
        nft:10,
        dividendPerNFT:2,
        status:"claimed",
    */
    // const uri = `${BASE_URI}/get-user-dividend`;
    // const requestKey = axios.generateRequestKey(uri);

    // const response = await axios.executeRequest(requestKey, () => {
    //     return axios.get(uri);
    // });

    // return response.body;

    const TMP_DATA: Array<UserDividendHistoryItem> = [{
        dateFrom:1667260801000,
        dividenId:"1",
        id:"1",
        dateTo:1668124801000,
        project:"VOT01",
        dividend:17,
        nft:7,
        dividendPerNFT:4,
        status:"claimed",
    },{
        dateFrom:1668124801000,
        dividenId:"2",
        id:"2",
        dateTo:1669124801000,
        project:"VOT01",
        dividend:220,
        nft:10,
        dividendPerNFT:8,
        status:"claimed",
    },{
        dateFrom:1669124801000,
        dividenId:"3",
        id:"3",
        dateTo:1671124801000,
        project:"VOT01",
        dividend:551,
        nft:33,
        dividendPerNFT:12,
        status:"available",
    }]

    return TMP_DATA;
}

export async function claimDividend() {
    const uri = `${BASE_URI}/claim-dividend`;
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
