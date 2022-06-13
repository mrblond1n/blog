import {INTL} from 'constants/intl';
import {useList, useStoreMap} from 'effector-react';
import {$idsList, $postsIndex} from 'features/posts/model/stores';
import {DescriptionWrapper} from 'features/posts/ui/atoms/DescriptionWrapper';
import {PostsWrapper} from 'features/posts/ui/atoms/PostsWrapper';
import {PostWrapper} from 'features/posts/ui/atoms/PostWrapper';
import React from 'react';
import {ROUTES} from 'routes';
import {Img} from 'ui/atoms/Image';
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
        <PostWrapper>
            <Img alt="post image" loading="lazy" src={post.img} />

            <DescriptionWrapper>
                <h4>{post.title}</h4>

                <p>{post.text}</p>
            </DescriptionWrapper>
            <NavLink href={`${ROUTES.POSTS}/${id}`} passHref>
                {intl(INTL.POSTS.OPEN)}
            </NavLink>
        </PostWrapper>
    );
});
