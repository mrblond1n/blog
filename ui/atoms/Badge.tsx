import React from 'react'
import {BadgeProps} from 'types/components'
import {Badge as Component} from 'ui/atoms'
import {styled} from 'utils/styles'

export const Badge = React.memo(({children, ...props}: BadgeProps) => (
  <StyledComponent {...props}>{children}</StyledComponent>
))

const StyledComponent = styled(Component)(() => ({
  margin: '0 12px',
}))
