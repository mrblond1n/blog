import {createTheme, deepOrange, deepPurple, grey} from 'utils/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: deepOrange,
    secondary: grey,
    divider: deepOrange[700],
    background: {
      default: '#020202',
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
  },
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: deepPurple,
    secondary: grey,
    divider: deepPurple[300],
    background: {
      default: '#020202',
    },
    text: {
      primary: '#000',
      secondary: grey[700],
    },
  },
})

export const getTheme = (value: 'dark' | 'light') => (value === 'dark' ? darkTheme : lightTheme)
