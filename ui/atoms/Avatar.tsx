import React from 'react'
import {AvatarProps} from 'types/components'
import {Avatar as Component} from 'ui/atoms'

export const Avatar = React.memo(({children, ...props}: AvatarProps) => <Component {...props}>{children}</Component>)
