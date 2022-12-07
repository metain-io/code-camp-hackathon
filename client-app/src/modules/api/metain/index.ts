import CryptoJS from 'crypto-js';
import logger from '@libs/logger';
import axios from './axios-client';

interface IMetainApi {
    oracle: {
        getExchangeRateList(): Promise<any>;
    }
}

class MetainApi implements IMetainApi{
    private _axios
    constructor() {
        this._axios = axios
    }

    oracle = { 
        getExchangeRateList: async() : Promise<any> => {
            // const uri = '/oracle/market-data';
            const uri = 'oracle/exchange-rate/list';
            const requestKey = this.generateRequestKey(uri);
            const rs = await this._axios.executeRequest(requestKey, () =>
            this._axios.get(uri, {
                    params: {},
                }),
            );

            logger.debug('============ getExchangeRateList - RS: ', rs);

            return rs?.body || [];
        }
    };

    private generateRequestKey(...args: any) {
        let key = ''
    
        for (let arg of args) {
            key += JSON.stringify(arg)
        }
    
        return CryptoJS.MD5(key).toString(CryptoJS.enc.Base64)
    }
}

export default new MetainApi();
export type { IMetainApi };
