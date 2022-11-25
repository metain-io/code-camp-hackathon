import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {CustodialWallet, ItemsQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_HYDRA_URL
const ITEM_URL = `${API_URL}/account`
const GET_ITEMS_URL = `${API_URL}/accounts/query`

const getItems = (query: string): Promise<ItemsQueryResponse> => {
  return axios
    .get(`${GET_ITEMS_URL}?${query}`)
    .then((d: AxiosResponse<ItemsQueryResponse>) => d.data)
}

const getItemById = (id: ID): Promise<CustodialWallet | undefined> => {
  return axios
    .get(`${ITEM_URL}/${id}`)
    .then((response: AxiosResponse<Response<CustodialWallet>>) => response.data)
    .then((response: Response<CustodialWallet>) => response.data)
}

const createItem = (user: CustodialWallet): Promise<CustodialWallet | undefined> => {
  return axios
    .put(ITEM_URL, user)
    .then((response: AxiosResponse<Response<CustodialWallet>>) => response.data)
    .then((response: Response<CustodialWallet>) => response.data)
}

const updateItem = (user: CustodialWallet): Promise<CustodialWallet | undefined> => {
  return axios
    .post(`${ITEM_URL}/${user._id}`, user)
    .then((response: AxiosResponse<Response<CustodialWallet>>) => response.data)
    .then((response: Response<CustodialWallet>) => response.data)
}

const deleteItem = (userId: ID): Promise<void> => {
  return axios.delete(`${ITEM_URL}/${userId}`).then(() => {})
}

const deleteSelectedItems = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${ITEM_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getItems, deleteItem, deleteSelectedItems, getItemById, createItem, updateItem}
