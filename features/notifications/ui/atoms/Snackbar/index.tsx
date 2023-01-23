import classnames from 'classnames';

import style from 'features/notifications/ui/atoms/Snackbar/style.module.css';
import React from 'react';
import {Stack} from 'ui/atoms/Stack';

type TProps = {
    children: React.ReactNode;
    colorScheme: string;
};

export const SnackbarWrapper = React.memo(({children, colorScheme}: TProps) => (
    <Stack
        alignItems="flex-start"
        className={classnames(style.container, style[colorScheme])}
        justifyContent="space-between"
    >
        {children}
    </Stack>
));

export default SnackbarWrapper;
