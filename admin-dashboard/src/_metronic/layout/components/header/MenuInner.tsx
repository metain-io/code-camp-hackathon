import React from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title={intl.formatMessage({id: 'MENU.SETTINGS'})} to='/settings' />

      <MenuInnerWithSub
        title='Collect'
        to='/collect'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem to='/collect/custodial-wallets' title='Custodial Wallets' icon='/media/icons/duotune/finance/fin008.svg' />
        <MenuItem to='/collect/hot-wallets' title='Hot Wallets' fontIcon='bi-fire' />
        <MenuItem to='/collect/cold-wallets' title='Cold Wallets' fontIcon='bi-snow3' />
        <MenuItem to='/collect/gas-wallets' title='Gas Wallets' fontIcon='bi-fuel-pump-fill' />
      </MenuInnerWithSub>

      <MenuInnerWithSub
        title='Withdraw'
        to='/withdraw'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem to='/withdraw/requests' title='Requests' icon='/media/icons/duotune/communication/com010.svg' />
        <MenuItem to='/withdraw/sendings' title='Sendings' icon='/media/icons/duotune/general/gen016.svg' />
        <MenuItem to='/withdraw/history' title='History' icon='/media/icons/duotune/general/gen012.svg' />
      </MenuInnerWithSub>
    </>
  )
}
