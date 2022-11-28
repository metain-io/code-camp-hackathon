/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {CustodialWallet} from '../../core/_models'
import {useIntl} from 'react-intl'

type Props = {
  item: CustodialWallet
}

const ItemNetworkCell: FC<Props> = ({item}) => {
  const intl = useIntl();
  
  return <div className='d-flex align-items-center'>    
    <div className='d-flex flex-column'>
      {intl.formatMessage({id: `BLOCKCHAIN.NAME.${item.network?.split("-")[0]}`})}
    </div>
  </div>
}

export {ItemNetworkCell}
