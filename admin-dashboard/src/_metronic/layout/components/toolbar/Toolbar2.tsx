/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {KTSVG} from '../../../helpers/components/KTSVG'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'
import {ChainNetworkSwitcher} from '../../../partials'

const Toolbar2: FC = () => {
  const {classes, config} = useLayout()

  const itemClass = 'ms-1 ms-lg-3',
    btnClass = 'btn btn-icon btn-active-light-primary w-auto px-2 h-30px h-md-40px';

  return (
    <div className='toolbar py-2' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex align-items-center')}
      >
        {config.pageTitle?.display && <DefaultTitle />}

        <div className='flex-grow-1 flex-shrink-0 me-5'></div>

        {/* begin::Actions */}
        <div
          className={
            config.pageTitle?.display
              ? 'd-flex align-items-center flex-wrap'
              : 'd-flex flex-stack flex-grow-1 flex-wrap'
          }
        >
          {/* begin::Wrapper */}
          <div className='d-flex align-items-center'>
            {/* begin::Theme mode */}
            <div className={clsx('d-flex align-items-center', itemClass)}>
              <ChainNetworkSwitcher toggleBtnClass={btnClass} />
            </div>
            {/* end::Theme mode */}

            {/* begin::Actions */}
            <div className='d-flex align-items-center'>
              <button
                type='button'
                className='btn btn-sm btn-icon btn-color-primary btn-active-light btn-active-color-primary'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_create_app'
                id='kt_toolbar_primary_button'
              >
                <KTSVG path='/media/icons/duotune/files/fil005.svg' className='svg-icon-2x' />
              </button>
            </div>
            {/* end::Actions */}
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar2}
