import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {AsideDefault} from './components/aside/AsideDefault'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {Toolbar} from './components/toolbar/Toolbar'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {PageDataProvider} from './core'
import {
  DrawerMessenger,
  ActivityDrawer,
  InviteUsers,
  UpgradePlan,
  ThemeModeProvider,
  ChainNetworkSwitchProvider
} from '../partials'
import {MenuComponent} from '../assets/ts/components'

const MasterLayout = () => {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <ChainNetworkSwitchProvider>
          <div className='d-flex flex-column flex-root'>
            {/* begin::Page */}
            <div className='page d-flex flex-row flex-column-fluid'>
              <AsideDefault />
              {/* begin::Wrapper */}
              <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
                <HeaderWrapper />

                <Toolbar />

                {/* begin::Content */}
                <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
                  <Content>
                    <Outlet />
                  </Content>
                </div>
                {/* end::Content */}
                <Footer />
              </div>
              {/* end::Wrapper */}
            </div>
            {/* end::Page */}
          </div>

          {/* begin:: Drawers */}
          <ActivityDrawer />
          <DrawerMessenger />
          {/* end:: Drawers */}

          {/* begin:: Modals */}
          <InviteUsers />
          <UpgradePlan />
          {/* end:: Modals */}
          <ScrollTop />
        </ChainNetworkSwitchProvider>
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export {MasterLayout}
