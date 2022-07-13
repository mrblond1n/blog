import {Badge as Component, BadgeProps} from '@mui/material';
import React from 'react';
import style from './style.module.css';

export const Badge = React.memo(({children, ...props}: BadgeProps) => (
    <Component className={style.container} {...props}>
        {children}
    </Component>
));
