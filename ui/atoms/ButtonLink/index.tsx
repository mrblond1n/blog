import Link from '@mui/material/Link';
import React from 'react';

type TProps = {
    onClick: () => any;
    children: React.ReactNode;
};

export const ButtonLink = React.memo(({children, ...props}: TProps) => (
    <Link component="button" {...props} variant="body2">
        {children}
    </Link>
));
