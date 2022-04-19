import React from 'react';
import {ROUTES} from 'routes';
import {NavLink} from 'ui/atoms/NavLink';

export default () => (
    <React.Fragment>
        <h1>{'About pages'}</h1>
        <NavLink href={ROUTES.HOME}>{'to Home'}</NavLink>
    </React.Fragment>
);
