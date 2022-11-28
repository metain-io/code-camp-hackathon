/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSubMain} from './AsideMenuItemWithSubMain'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        title="Home"
        fontIcon='bi-house fs-2'
        bsTitle={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        className='py-2'
      />

      <AsideMenuItemWithSubMain
        to='/collect/pages'
        title='Collect'
        fontIcon='bi-bank'
        bsTitle='Collect'
      >
        <AsideMenuItem to='/collect/custodial-wallets' title='Custodial Wallets' fontIcon="bi-wallet2" />
        <AsideMenuItem to='/collect/hot-wallets' title='Hot Wallets' fontIcon='bi-fire' />
        <AsideMenuItem to='/collect/cold-wallets' title='Cold Wallets' fontIcon='bi-snow3' />
        <AsideMenuItem to='/collect/gas-wallets' title='Gas Wallets' fontIcon='bi-fuel-pump-fill' />
      </AsideMenuItemWithSubMain>

      <AsideMenuItemWithSubMain
        to='/withdraw/pages'
        title='Withdraw'
        fontIcon='bi-cart4'
        bsTitle='Withdraw'
      >
        <AsideMenuItem to='/withdraw/requests' title='Requests' fontIcon="bi-inboxes" />
        <AsideMenuItem to='/withdraw/sendings' title='Sendings' fontIcon="bi-send" />
        <AsideMenuItem to='/withdraw/history' title='History' fontIcon="bi-clock-history" />
      </AsideMenuItemWithSubMain>
      
      <AsideMenuItemWithSubMain
        to='/settings'
        title='Resources'
        bsTitle='Resources'
        fontIcon='bi-gear'
      >
        <AsideMenuItem to='/settings' title='Settings' fontIcon='bi-layers fs-3' />
        <AsideMenuItem
          to={'https://bscscan.com/'}
          outside={true}
          title={'Blockchain Explorers'}
          fontIcon='bi-card-text fs-3'
        />
      </AsideMenuItemWithSubMain>

      <AsideMenuItemWithSubMain
        to='/system/pages'
        title='System'
        fontIcon='bi-server'
        bsTitle='System'
      >
        <AsideMenuItem to='/system/errors' title='Error Tickets' fontIcon="bi-bug" />
        <AsideMenuItem to='/system/attentions' title='Attention Requests' fontIcon="bi-exclamation-circle" />
        <AsideMenuItem to='/system/mantenance' title='Mantenance' fontIcon="bi-tools" />
      </AsideMenuItemWithSubMain>
    </>
  )
}
