import React from 'react';
import {Avatar as Component, AvatarProps} from 'ui/atoms';

export const Avatar = React.memo(({children, ...props}: AvatarProps) => <Component {...props}>{children}</Component>);
