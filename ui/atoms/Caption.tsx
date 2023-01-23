import React from 'react';
import {Typography, TypographyProps} from 'ui/atoms';

export const Caption = React.memo(({children, ...props}: TypographyProps) => (
    <Typography variant="caption" {...props}>
        {children}
    </Typography>
));
