import {Wrapper} from 'features/app/ui/atoms/Wrapper'
import {LoginButtonContainer} from 'features/pages/signin/containers/LoginButtonContainer'
import {LogoutButtonContainer} from 'features/pages/signin/containers/LogoutButtonContainer'
import {ThemeSwitcherButtonContainer} from 'features/theme/container/ThemeSwitcherButtonContainer'
import React from 'react'

export const HeaderContainer = React.memo(() => {
  return (
    <Wrapper>
      <LoginButtonContainer />
      <LogoutButtonContainer />
      <ThemeSwitcherButtonContainer />
    </Wrapper>
  )
})
