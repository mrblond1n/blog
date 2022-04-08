import {useGate} from 'effector-react';
import {ContentContainer} from 'features/posts/containers/ContentContainer';
import {Gate} from 'features/posts/model';
import {onClick} from 'features/posts/model/events';
import React from 'react';
import {ROUTES} from 'routes';
import {Button} from 'ui/atoms/Button';
import {NavLink} from 'ui/atoms/NavLink';

export default () => {
    useGate(Gate);

    const handleClick = React.useCallback(() => onClick(), []);

    return (
        <div>
            <h1>{'POSTS'}</h1>

            <Button onClick={handleClick}>{'Update posts'}</Button>

            <ContentContainer />

            <NavLink href={ROUTES.HOME}>{'to home'}</NavLink>
        </div>
    );
};
