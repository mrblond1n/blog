import React from 'react'
import {IconButtonProps} from 'types/components'
import {IconButton as MUIIconButton} from 'ui/atoms'

export const IconButton = React.memo(({children, ...props}: IconButtonProps) => (
  <MUIIconButton {...props}>{children}</MUIIconButton>
))
