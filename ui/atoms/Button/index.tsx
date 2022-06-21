import {Button as MUIButton, ButtonProps} from '@mui/material';
import React from 'react';

export const Button = React.memo(({children, ...props}: ButtonProps) => <MUIButton {...props}>{children}</MUIButton>);
