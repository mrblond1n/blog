import {useStore} from 'effector-react';
import {$body, $title} from 'features/post/model/stores';
import {ROUTES} from 'routes';
import {NavLink} from 'ui/atoms/NavLink';

export const PostContainer = () => {
    const body = useStore($body);
    const title = useStore($title);

    return (
        <div>
            <div>{title}</div>
            <div>{body}</div>
            <NavLink href={ROUTES.HOME}>{'to home'}</NavLink>
        </div>
    );
};
