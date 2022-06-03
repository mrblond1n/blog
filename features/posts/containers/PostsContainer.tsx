import {INTL} from 'constants/intl';
import {useList, useStoreMap} from 'effector-react';
import {$idsList, $imagesUrlIndex, $postsIndex} from 'features/posts/model/stores';
import {Post} from 'features/posts/ui/Post';
import React from 'react';
import {ROUTES} from 'routes';
import {Img} from 'ui/atoms/Image';
import {NavLink} from 'ui/atoms/NavLink';
import {Row} from 'ui/atoms/Row';
import {intl} from 'utils/intl';

export const PostsContainer = React.memo(() =>
    useList($idsList, id => (
        <div key={id} data-testid={`post_${id}`}>
            <Row alignItems="center">
                <PostContainer id={id} />
            </Row>

            <NavLink href={`${ROUTES.POSTS}/${id}`}>{intl(INTL.POSTS.OPEN)}</NavLink>
        </div>
    ))
);

export const PostContainer = React.memo(({id}: {id: string}) => {
    const post = useStoreMap({
        store: $postsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    return (
        <Row direction="column">
            <PostImage id={id} />
            <h4>{post.title}</h4>
            <Post>{post.text}</Post>
        </Row>
    );
});

const PostImage = React.memo(({id}: {id: string}) => {
    const url = useStoreMap({
        store: $imagesUrlIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    return <Img alt="qwe" height="150" src={url} width="200" />;
});
