// eslint-disable-next-line no-restricted-imports
import {styled as MUIStyled} from '@mui/material'
import {Theme} from '@mui/material/styles/createTheme'
import {CreateMUIStyled} from '@mui/system'

export {alpha, createTheme} from '@mui/material'
export {deepOrange, deepPurple, grey} from '@mui/material/colors'

export const styled: CreateMUIStyled<Theme> = (Component: any, options: any) => MUIStyled(Component, options)
