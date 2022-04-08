import React from 'react';
import {ROUTES} from 'routes';
import {NavLink} from 'ui/atoms/NavLink';

export default () => {
    return (
        <div>
            <h1>{'Welcome to Next.js!'}</h1>
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
        </div>
    );
};
