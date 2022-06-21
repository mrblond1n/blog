import {Link as MUILink, LinkProps as MUILinkProps} from '@mui/material';
import {LinkProps} from 'next/dist/client/link';
import Link from 'next/link';
import React from 'react';

type TProps = React.PropsWithChildren<LinkProps> & MUILinkProps;

export const NavLink = React.memo(({children, ...props}: TProps) => {
    return (
        <Link as={props.as} href={props.href} passHref>
            <MUILink color={props.color}>{children}</MUILink>
        </Link>
    );
});
