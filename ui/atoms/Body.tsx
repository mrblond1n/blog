import React from 'react';
import {TypographyProps} from 'types/components';
import {Typography} from 'ui/atoms';

export const Body = React.memo(({children, ...props}: TypographyProps) => (
    <Typography variant="body1" {...props}>
        {children}
    </Typography>
));
