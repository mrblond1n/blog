import {INTL} from 'constants/intl';
import {useList, useStoreMap} from 'effector-react';
import {removePost} from 'features/posts/model/events';
import {$disabledIndex, $idsList, $postsIndex} from 'features/posts/model/stores';
import {Post} from 'features/posts/ui/Post';
import React from 'react';
import {ROUTES} from 'routes';
import {Button} from 'ui/atoms/Button';
import {NavLink} from 'ui/atoms/NavLink';
import {intl} from 'utils/intl';

export const PostsContainer = React.memo(() => useList($idsList, id => <PostContainer id={id} />));

export const PostContainer = React.memo(({id}: {id: string}) => {
    const post = useStoreMap({
        store: $postsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const disabled = useStoreMap({
        store: $disabledIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const handleClick = React.useCallback(() => removePost(post.id), [post.id]);
    const postId = `post_${post.id}`;

    return (
        <div data-testid={postId}>
            <Post>{post.text}</Post>
            <NavLink href={`${ROUTES.POSTS}/${post.id}`}>{intl(INTL.POSTS.OPEN)}</NavLink>
            <Button disabled={disabled} onClick={handleClick}>
                {intl(INTL.POSTS.REMOVE)}
            </Button>
        </div>
    );
});
