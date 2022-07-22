import {MenuItem as Component, MenuItemProps} from '@mui/material';
import React from 'react';

export const MenuItem = React.memo(({children, ...props}: MenuItemProps) => (
    <Component {...props}>{children}</Component>
));
