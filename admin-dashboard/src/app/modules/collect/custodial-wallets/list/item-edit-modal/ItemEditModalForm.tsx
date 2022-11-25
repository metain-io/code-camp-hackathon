import {FC, useState} from 'react'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {CustodialWallet} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ItemsListLoading} from '../components/loading/ItemsListLoading'
import {createItem, updateItem} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isItemLoading: boolean
  item: CustodialWallet
}

const ItemEditModalForm: FC<Props> = ({item, isItemLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [itemForEdit] = useState<CustodialWallet>({
    ...item
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: itemForEdit,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values._id)) {
          await updateItem(values)
        } else {
          await createItem(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >         
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2'>Address</label>
            {/* end::Label */}

            <input
              readOnly={true}
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('address')}
              className={clsx(
                'form-control form-control-lg form-control-solid is-valid'                
              )}
            />
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2'>Total Balances</label>
            {/* end::Label */}

            <input
              readOnly={true}
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('estimatedBalanceValue')}
              className={clsx(
                'form-control form-control-lg form-control-solid is-valid'                
              )}
            />
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className='mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-5'>Balances</label>
            {/* end::Label */}
            
            {/* begin::Table */}
            <table className='table gs-0 gy-5'>
              {/* begin::Table head */}
              <thead>
                <tr>
                  <th className='p-0 min-w-100px'>Token</th>
                  <th className='p-0 min-w-200px'>Amount</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {item.balances && Object.keys(item.balances).map((currency) => (<tr>
                  <td>
                    <span className='text-muted me-2 fs-7 fw-semibold'>{currency}</span>
                  </td>
                  <td>
                    <span className='text-muted me-2 fs-7 fw-semibold'>{item.balances![currency]}</span>
                  </td>
                </tr>))}
              </tbody>
            </table>
          </div>
          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isItemLoading}
          >
            Close
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isItemLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isItemLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isItemLoading) && <ItemsListLoading />}
    </>
  )
}

export {ItemEditModalForm}
