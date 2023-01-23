import React from 'react';
import {Typography, TypographyProps} from 'ui/atoms';

export const Body = React.memo(({children, ...props}: TypographyProps) => (
    <Typography variant="body1" {...props}>
        {children}
    </Typography>
));
