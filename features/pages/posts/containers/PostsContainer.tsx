import {useList, useStoreMap} from 'effector-react';
import {PostContent} from 'features/pages/post/state/ui/molecules/PostContent';
import {PostHeader} from 'features/pages/post/state/ui/molecules/PostHeader';
import {PostMedia} from 'features/pages/post/state/ui/molecules/PostMedia';
import {concatStrings, getInitials} from 'features/pages/post/utils';
import {$idsList, $postsIndex} from 'features/pages/posts/model/stores';
import {PostsWrapper} from 'features/pages/posts/ui/atoms/PostsWrapper';
import {PostWrapper} from 'features/pages/posts/ui/atoms/PostWrapper';
import {Icons} from 'icons';
import React from 'react';
import {ROUTES} from 'routes';
import {Badge} from 'ui/atoms/Badge';
import {Card} from 'ui/atoms/Card';
import {NavLink} from 'ui/atoms/NavLink';
import {dateFromNow} from 'utils/date';

export const PostsContainer = React.memo(() => (
    <PostsWrapper>
        {useList($idsList, id => (
            <PostWrapper id={id}>
                <NavLink href={`${ROUTES.POSTS}/${id}`} passHref>
                    <PostContainer id={id} />
                </NavLink>
            </PostWrapper>
        ))}
    </PostsWrapper>
));

export const PostContainer = React.memo(({id}: {id: string}) => {
    const post = useStoreMap({
        store: $postsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const date = dateFromNow(post.created_at);

    const headerTitle = React.useMemo(() => concatStrings(post.author, date), [post.author, date]);
    const initials = React.useMemo(() => getInitials(post.author), [post.author]);

    return (
        <Card.Main>
            <PostHeader initials={initials} subtitle={headerTitle} title={post.title} />

            <PostMedia img={post.img} />

            <PostContent text={post.text} title={post.title} />

            <Card.Actions>
                <Badge badgeContent={post.watches_count} color="primary">
                    <Icons.RemoveRedEye />
                </Badge>

                <Badge badgeContent={post.comments_count} color="primary">
                    <Icons.Comment />
                </Badge>
            </Card.Actions>
        </Card.Main>
    );
});
