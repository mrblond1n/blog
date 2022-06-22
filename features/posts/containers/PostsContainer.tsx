import {Typography} from '@mui/material';
import {INTL} from 'constants/intl';
import {useList, useStoreMap} from 'effector-react';
import {$idsList, $postsIndex} from 'features/posts/model/stores';
import {PostsWrapper} from 'features/posts/ui/atoms/PostsWrapper';
import React from 'react';
import {ROUTES} from 'routes';
import {Card} from 'ui/atoms/Card';
import {NavLink} from 'ui/atoms/NavLink';
import {intl} from 'utils/intl';

export const PostsContainer = React.memo(() => (
    <PostsWrapper>
        {useList($idsList, id => (
            <div key={id} data-testid={`post_${id}`}>
                <PostContainer id={id} />
            </div>
        ))}
    </PostsWrapper>
));

export const PostContainer = React.memo(({id}: {id: string}) => {
    const post = useStoreMap({
        store: $postsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    return (
        <Card.Main>
            <Card.Media alt="post image" component="img" src={post.img} />
            <Card.Content>
                <Typography color="white" variant="h5">
                    {post.title}
                </Typography>

                <Typography color="white" variant="body2">
                    {post.text}
                </Typography>
            </Card.Content>

            <Card.Actions>
                <NavLink color="#fff" href={`${ROUTES.POSTS}/${id}`} passHref>
                    {intl(INTL.POSTS.OPEN)}
                </NavLink>
            </Card.Actions>
        </Card.Main>
    );
});
