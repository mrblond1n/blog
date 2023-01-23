import {LinkProps as MUILinkProps} from '@mui/material';
import {LinkProps} from 'next/dist/client/link';
import Link from 'next/link';
import React from 'react';
import {styled} from 'utils/styles';

type TProps = React.PropsWithChildren<LinkProps> & MUILinkProps;

export const NavLink = React.memo(({children, ...props}: TProps) => {
    return (
        <StyledLink href={props.href} passHref>
            {children}
        </StyledLink>
    );
});

const StyledLink = styled(Link)(({theme}) => ({
    color: theme.palette.primary.main,
}));
