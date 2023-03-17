import {useGate, useStore} from 'effector-react'
import {HeaderContainer} from 'features/app/containers/HeaderContainer'
import {Gate} from 'features/app/model'
import {$appState} from 'features/app/model/stores'
import {NotifyContainer} from 'features/notifications/containers/NotifyContainer'
import React from 'react'
import {PageLoader} from 'ui/organisms/PageLoader'
import {MainTemplate} from 'ui/templates/MainTemplate'
import {PageTemplate} from 'ui/templates/PageTemplate'

export const AppContainer = ({children}: {children: React.ReactNode}) => {
  useGate(Gate)
  const state = useStore($appState)

  if (state === 'INITIAL_LOADING') return <PageLoader />

  return (
    <PageTemplate header={<HeaderContainer />}>
      <MainTemplate>{children}</MainTemplate>

      <NotifyContainer />
    </PageTemplate>
  )
}
