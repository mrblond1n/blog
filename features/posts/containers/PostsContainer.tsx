import {useList, useStoreMap} from 'effector-react';
import {removePost} from 'features/posts/model/events';
import {$idsList, $postsIndex} from 'features/posts/model/stores';
import {Post} from 'features/posts/ui/Post';
import React from 'react';
import {ROUTES} from 'routes';
import {Button} from 'ui/atoms/Button';
import {NavLink} from 'ui/atoms/NavLink';

export const PostsContainer = React.memo(() => useList($idsList, id => <PostContainer id={id} />));

const PostContainer = React.memo(({id}: {id: string}) => {
    const post = useStoreMap({
        store: $postsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const handleClick = React.useCallback(() => removePost(post.id), [post.id]);

    return (
        <div>
            <Post>{post.text}</Post>
            <NavLink href={`${ROUTES.POSTS}/${post.id}`}>{'to post'}</NavLink>
            <Button onClick={handleClick}>{'Удалить'}</Button>
        </div>
    );
});
