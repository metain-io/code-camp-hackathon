import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ItemsListHeader} from './components/header/ItemsListHeader'
import {ItemsTable} from './table/ItemsTable'
import {ItemEditModal} from './item-edit-modal/ItemEditModal'
import {KTCard} from '../../../../../_metronic/helpers'

const ItemsList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ItemsListHeader />
        <ItemsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <ItemEditModal />}
    </>
  )
}

const ItemsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ItemsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ItemsListWrapper}
