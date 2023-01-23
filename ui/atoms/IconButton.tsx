import React from 'react';
import {IconButton as MUIIconButton, IconButtonProps} from 'ui/atoms';

export const IconButton = React.memo(({children, ...props}: IconButtonProps) => (
    <MUIIconButton {...props}>{children}</MUIIconButton>
));
