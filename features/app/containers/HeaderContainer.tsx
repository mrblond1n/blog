import {Stack} from 'ui/atoms/Stack'
import {styled} from 'utils/styles'
import {Wrapper} from 'features/app/ui/atoms/Wrapper'
import {LoginButtonContainer} from 'features/pages/signin/containers/LoginButtonContainer'
import {LogoutButtonContainer} from 'features/pages/signin/containers/LogoutButtonContainer'
import {ThemeSwitcherButtonContainer} from 'features/theme/container/ThemeSwitcherButtonContainer'
import React from 'react'

export const HeaderContainer = React.memo(() => {
  return (
    <Wrapper mb={2}>
      <StyledHeader height={40} justifyContent="flex-end" pr={2}>
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
  width: '100%',
  zIndex: 1,
  background: theme.palette.background.paper,
}))
