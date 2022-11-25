import {useQuery} from 'react-query'
import {ItemEditModalForm} from './ItemEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getItemById} from '../core/_requests'

const ItemEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: item,
    error,
  } = useQuery(
    `${QUERIES.ACCOUNTS_LIST}-account-${itemIdForUpdate}`,
    () => {
      return getItemById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <ItemEditModalForm isItemLoading={isLoading} item={{_id: undefined}} />
  }

  if (!isLoading && !error && item) {
    return <ItemEditModalForm isItemLoading={isLoading} item={item} />
  }

  return null
}

export {ItemEditModalFormWrapper}
