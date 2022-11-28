import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {ItemsListWrapper} from './list/ItemsList'

const pageBreadcrumbs: Array<PageLink> = [
  {
    title: 'Custodial Wallets',
    path: '/collect/custodial-wallets',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const CollectCustodialWalletsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={pageBreadcrumbs}>Custodial Wallets</PageTitle>
              <ItemsListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/collect/custodial-wallets/list' />} />
    </Routes>
  )
}

export default CollectCustodialWalletsPage
