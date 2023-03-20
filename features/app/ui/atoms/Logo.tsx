import {Typography} from '@mui/material'
import {INTL} from 'constants/intl'
import {intl} from 'utils/intl'
import {styled} from 'utils/styles'

export const Logo = ({onClick}: {onClick?: () => void}) => (
  <StyledLogo active={!!onClick} onClick={onClick}>
    <Typography fontSize={12} fontWeight="bold" noWrap textTransform="uppercase">
      {intl(INTL.APP.NAME)}
    </Typography>
  </StyledLogo>
)

const StyledLogo = styled('div')<{active: boolean}>(({active, theme}) => {
  const color = theme.palette.primary.main
  const border = `1px solid ${color}`

  return {
    position: 'relative',
    padding: '10px 20px',
    transition: '.3s',
    cursor: active ? 'pointer' : 'default',
    '&:after': {
      ...borderStyled,
      border,
      top: 5,
      left: 5,
    },
    '&:before': {
      ...borderStyled,
      border,
      top: -5,
      left: -5,
    },
    '&:hover': active
      ? {
          opacity: 0.7,
        }
      : void 0,
  }
})

const borderStyled = {
  content: "''",
  position: 'absolute',
  width: '100%',
  height: '100%',
}
