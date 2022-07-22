import {Menu as Component, MenuProps} from '@mui/material';
import React from 'react';

export const Menu = React.memo(({children, ...props}: MenuProps) => <Component {...props}>{children}</Component>);
