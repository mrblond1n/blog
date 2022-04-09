import React from 'react';
import {ROUTES} from 'routes';
import {NavLink} from 'ui/atoms/NavLink';
import {MainTemplate} from 'ui/templates/MainTemplate';
import {PageTemplate} from 'ui/templates/PageTemplate';

export default () => {
    return (
        <PageTemplate footer={<div>{'some footer'}</div>} header={<h1>{'Welcome to Next.js!'}</h1>}>
            <MainTemplate>
                <ul>
                    <li>
                        <NavLink href={ROUTES.ABOUT}>{'Example transition to ABOUT'}</NavLink>
                    </li>
                    <li>
                        <NavLink href={ROUTES.EFFECTOR}>{'Example transition to EFFECTOR example'}</NavLink>
                    </li>
                    <li>
                        <NavLink href={ROUTES.POSTS}>{'to posts'}</NavLink>
                    </li>
                </ul>
            </MainTemplate>
        </PageTemplate>
    );
};
