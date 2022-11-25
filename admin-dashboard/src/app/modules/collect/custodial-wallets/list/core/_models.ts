import {ID, Response} from '../../../../../../_metronic/helpers'
export type CustodialWallet = {
  _id: ID,
  network?: string,
  address?: string,
  encPrivateKey?: string,
  encPublicKey?: string,
  decryptKeyId?: string,
  balances?: {[id: string]: number},
  estimatedBalanceValue?: number
}

export type ItemsQueryResponse = Response<Array<CustodialWallet>>

export const initialUser: CustodialWallet = {
  _id: '',
  network: '',
  address: '',
  encPrivateKey: '',
  encPublicKey: '',
  decryptKeyId: '',
  balances: {},
  estimatedBalanceValue: 0
}
