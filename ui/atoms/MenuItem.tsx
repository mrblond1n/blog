import React from 'react';
import {MenuItemProps} from 'types/components';
import {MenuItem as Component} from 'ui/atoms';

export const MenuItem = React.memo(({children, ...props}: MenuItemProps) => (
    <Component {...props}>{children}</Component>
));
