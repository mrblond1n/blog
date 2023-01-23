import React from 'react';
import {Menu as Component, MenuProps} from 'ui/atoms';

export const Menu = React.memo(({children, ...props}: MenuProps) => <Component {...props}>{children}</Component>);
