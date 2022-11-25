import {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {SettingsPage} from './SettingsPage'

const SettingsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Settings</PageTitle>
      <SettingsPage />
    </>
  )
}

export default SettingsPageWrapper
