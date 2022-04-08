import Link from 'next/link';
import React from 'react';
import {TDeepRoutes, TRoutes} from 'routes';
import style from './NavLink.module.css';

type TProps = {
    children: React.ReactNode;
    href: TRoutes | TDeepRoutes;
};
export const NavLink = React.memo(({children, ...props}: TProps) => {
    return (
        <div className={style.container}>
            <Link {...props}>{children}</Link>
        </div>
    );
});
