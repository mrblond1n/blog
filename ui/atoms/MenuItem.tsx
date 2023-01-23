import React from 'react';
import {MenuItem as Component, MenuItemProps} from 'ui/atoms';

export const MenuItem = React.memo(({children, ...props}: MenuItemProps) => (
    <Component {...props}>{children}</Component>
));
