import React from 'react'
import {BadgeProps} from 'types/components'
import {Badge as Component} from 'ui/atoms'

export const Badge = ({children, ...props}: BadgeProps) => <Component {...props}>{children}</Component>
