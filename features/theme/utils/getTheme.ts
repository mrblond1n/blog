import {ThemeOptions, Theme} from 'types'
import {createTheme, deepOrange, deepPurple, grey} from 'utils/styles'

const defaultTheme: ThemeOptions = {
  components: {
    MuiBadge: {
      styleOverrides: {
        badge: {fontSize: 9, height: 15, minWidth: 15},
      },
    },
  },
}

const darkTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'dark',
    primary: deepOrange,
    secondary: grey,
    divider: deepOrange[700],
    background: {
      default: grey[900],
    },
    text: {
      primary: grey['A100'],
      secondary: grey[500],
    },
  },
})

export const lightTheme: Theme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: deepPurple,
    secondary: grey,
    divider: deepPurple[300],
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
})

export const getTheme = (value: 'dark' | 'light') => ({...defaultTheme, ...(value === 'dark' ? darkTheme : lightTheme)})
