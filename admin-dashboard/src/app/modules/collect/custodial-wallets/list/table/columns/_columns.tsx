import {Column} from 'react-table'
import {ItemAddressCell} from './ItemAddressCell'
import {ItemNetworkCell} from './ItemNetworkCell'
import {ItemTotalBalances} from './ItemTotalBalances'
import {ItemActionsCell} from './ItemActionsCell'
import {ItemSelectionCell} from './ItemSelectionCell'
import {ItemCustomHeader} from './ItemCustomHeader'
import {ItemSelectionHeader} from './ItemSelectionHeader'
import {CustodialWallet} from '../../core/_models'

const itemsColumns: ReadonlyArray<Column<CustodialWallet>> = [
  {
    Header: (props) => <ItemSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <ItemSelectionCell id={props.data[props.row.index]._id} />,
  },
  {
    Header: (props) => <ItemCustomHeader tableProps={props} title='Address' className='min-w-125px' />,
    id: '_id',
    Cell: ({...props}) => <ItemAddressCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <ItemCustomHeader tableProps={props} title='Network' className='min-w-125px' />
    ),
    id: 'network',
    Cell: ({...props}) => <ItemNetworkCell item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <ItemCustomHeader tableProps={props} title='Total Balances' className='min-w-125px' />
    ),
    id: 'estimatedBalanceValue',
    Cell: ({...props}) => <ItemTotalBalances item={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <ItemCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ItemActionsCell id={props.data[props.row.index]._id} />,
  },
]

export {itemsColumns}
