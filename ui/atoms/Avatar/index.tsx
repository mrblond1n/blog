import {Avatar as Component, AvatarProps} from '@mui/material';
import React from 'react';

export const Avatar = React.memo(({children, ...props}: AvatarProps) => <Component {...props}>{children}</Component>);
