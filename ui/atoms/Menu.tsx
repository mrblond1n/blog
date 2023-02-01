import React from 'react';
import {MenuProps} from 'types/components';
import {Menu as Component} from 'ui/atoms';

export const Menu = React.memo(({children, ...props}: MenuProps) => <Component {...props}>{children}</Component>);
