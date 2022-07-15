import React from 'react';
import {Typography, TypographyProps} from '@mui/material';

export const Body = React.memo(({children, ...props}: TypographyProps) => (
    <Typography {...props} variant="body1">
        {children}
    </Typography>
));
