import {useListView} from '../../core/ListViewProvider'
import {UsersListToolbar} from './ItemListToolbar'
import {ItemsListGrouping} from './ItemsListGrouping'
import {ItemsListSearchComponent} from './ItemsListSearchComponent'

const ItemsListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ItemsListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <ItemsListGrouping /> : <UsersListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ItemsListHeader}
