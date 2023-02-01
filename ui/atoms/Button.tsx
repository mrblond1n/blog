import React from 'react';
import {ButtonProps} from 'types/components';
import {Button as MUIButton} from 'ui/atoms';

export const Button = React.memo(({children, ...props}: ButtonProps) => <MUIButton {...props}>{children}</MUIButton>);
