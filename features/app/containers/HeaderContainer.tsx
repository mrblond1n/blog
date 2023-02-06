import {Wrapper} from 'features/app/ui/atoms/Wrapper'
import {NavigationContainer} from 'features/router/containers/NavigationContainer'
import {ThemeSwitcherButtonContainer} from 'features/theme/container/ThemeSwitcherButtonContainer'
import {LogoutButtonContainer} from 'features/pages/signin/containers/LogoutButtonContainer'
import React from 'react'

export const HeaderContainer = React.memo(() => {
  return (
    <Wrapper>
      <NavigationContainer />
      <LogoutButtonContainer />
      <ThemeSwitcherButtonContainer />
    </Wrapper>
  )
})
