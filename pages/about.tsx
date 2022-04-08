import React from 'react';
import {ROUTES} from 'routes';
import {NavLink} from 'ui/atoms/NavLink';

export default () => (
    <div>
        <h1>{'About pages'}</h1>
        <NavLink href={ROUTES.HOME}>{'to Home'}</NavLink>
    </div>
);
