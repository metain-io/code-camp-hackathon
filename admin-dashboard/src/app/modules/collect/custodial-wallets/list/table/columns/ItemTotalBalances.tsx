/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {CustodialWallet} from '../../core/_models'

type Props = {
  item: CustodialWallet
}

const ItemTotalBalances: FC<Props> = ({item}) => (
  <div className='d-flex align-items-center'>    
    <div className='d-flex flex-column'>
      {item.estimatedBalanceValue || 0}
    </div>
  </div>
)

export {ItemTotalBalances}
