import {LinkProps} from 'next/dist/client/link';
import Link from 'next/link';
import React from 'react';
import style from './NavLink.module.css';

export const NavLink = React.memo(({children, ...props}: React.PropsWithChildren<LinkProps>) => {
    return (
        <div className={style.container}>
            <Link {...props}>{children}</Link>
        </div>
    );
});
