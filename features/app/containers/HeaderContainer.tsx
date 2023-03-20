import {Logo} from 'features/app/ui/atoms/Logo'
import {Wrapper} from 'features/app/ui/atoms/Wrapper'
import {LoginButtonContainer} from 'features/pages/signin/containers/LoginButtonContainer'
import {LogoutButtonContainer} from 'features/pages/signin/containers/LogoutButtonContainer'
import {ThemeSwitcherButtonContainer} from 'features/theme/container/ThemeSwitcherButtonContainer'
import React from 'react'
import {ROUTES} from 'routes'
import {NavLink} from 'ui/atoms/NavLink'
import {Stack} from 'ui/atoms/Stack'
import {styled} from 'utils/styles'

export const HeaderContainer = React.memo(() => {
  return (
    <Wrapper>
      <StyledHeader justifyContent="flex-end" p={2}>
        <NavLink href={ROUTES.HOME}>
          <Logo />
        </NavLink>

        <div style={{width: '100%'}} />

        <LoginButtonContainer />
        <LogoutButtonContainer />
        <ThemeSwitcherButtonContainer />
      </StyledHeader>
    </Wrapper>
  )
})

const StyledHeader = styled(Stack)(({theme}) => ({
  position: 'fixed',
  top: '0',
  left: 0,
  width: '100%',
  zIndex: 2,
  background: theme.palette.background.default,
}))
