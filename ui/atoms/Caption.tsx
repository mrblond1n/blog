import React from 'react';
import {TypographyProps} from 'types/components';
import {Typography} from 'ui/atoms';

export const Caption = React.memo(({children, ...props}: TypographyProps) => (
    <Typography variant="caption" {...props}>
        {children}
    </Typography>
));
