import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {
  ChainNetworkType,
  SUPPORTED_CHAINS,
  useChainNetworkSwitch,
} from './ChainNetworkSwitchProvider'

/* eslint-disable jsx-a11y/anchor-is-valid */
type Props = {
  toggleBtnClass?: string
  toggleBtnIconClass?: string
  menuPlacement?: string
  menuTrigger?: string
}

const ChainNetworkSwitcher = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'svg-icon-2',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
  const intl = useIntl()

  const {network, updateNetwork} = useChainNetworkSwitch()
  const calculatedMode = network
  const switchNetwork = (_network: ChainNetworkType) => {
    updateNetwork(_network)
  }

  return (
    <>
      {/* begin::Menu toggle */}
      <a
        href='#'
        className={clsx('btn ', toggleBtnClass)}
        data-kt-menu-trigger={menuTrigger}
        data-kt-menu-attach='parent'
        data-kt-menu-placement={menuPlacement}
      >
        <KTSVG
          path={`/media/icons/blockchain/${calculatedMode}.svg`}
          className={clsx('theme-light-hide me-2 ', toggleBtnIconClass)}
        />
        <span className='menu-title'>{intl.formatMessage({id: `BLOCKCHAIN.NAME.${calculatedMode}`})}</span>
      </a>
      {/* begin::Menu toggle */}

      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        {SUPPORTED_CHAINS.map((id) => (
          <div key={id} className='menu-item px-3 my-0'>
            <a
              href='#'
              className={clsx('menu-link px-3 py-2', {active: network === id})}
              onClick={() => switchNetwork(id)}
            >
              <span className='menu-icon' data-kt-element='icon'>
                <KTSVG path={`/media/icons/blockchain/${id}.svg`} className='svg-icon-3' />
              </span>
              <span className='menu-title'>{intl.formatMessage({id: `BLOCKCHAIN.NAME.${id}`})}</span>
            </a>
          </div>
        ))}

        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {ChainNetworkSwitcher}
