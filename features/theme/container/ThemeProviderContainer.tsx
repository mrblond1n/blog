import {useGate, useStore} from 'effector-react'
import {Gate} from 'features/theme/model'
import {$appTheme} from 'features/theme/model/stores'
import {ThemeProvider} from 'next-themes'
import React from 'react'
import {ThemeProvider as MuiThemeProvider} from 'ui/atoms'

export const ThemeProviderContainer = React.memo(({children}) => {
  useGate(Gate)
  const theme = useStore($appTheme)

  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  )
})
