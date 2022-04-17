import React from 'react';
import {ROUTES} from 'routes';
import {NavLink} from 'ui/atoms/NavLink';
import {Page} from 'ui/organisms/Page';

export default () => (
    <Page>
        <h1>{'About pages'}</h1>
        <NavLink href={ROUTES.HOME}>{'to Home'}</NavLink>
    </Page>
);
