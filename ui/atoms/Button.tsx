import React from 'react';
import {Button as MUIButton, ButtonProps} from 'ui/atoms';

export const Button = React.memo(({children, ...props}: ButtonProps) => <MUIButton {...props}>{children}</MUIButton>);
