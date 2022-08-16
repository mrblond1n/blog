import {INTL} from 'constants/intl';
import {useList, useStoreMap} from 'effector-react';
import {PostContent} from 'features/post/state/ui/molecules/PostContent';
import {PostHeader} from 'features/post/state/ui/molecules/PostHeader';
import {PostMedia} from 'features/post/state/ui/molecules/PostMedia';
import {concatStrings, getInitials} from 'features/post/utils';
import {$idsList, $postsIndex} from 'features/posts/model/stores';
import {PostsWrapper} from 'features/posts/ui/atoms/PostsWrapper';
import {PostWrapper} from 'features/posts/ui/atoms/PostWrapper';
import {Icons} from 'icons';
import React from 'react';
import {ROUTES} from 'routes';
import {Badge} from 'ui/atoms/Badge';
import {Card} from 'ui/atoms/Card';
import {NavLink} from 'ui/atoms/NavLink';
import {dateFromNow} from 'utils/date';
import {intl} from 'utils/intl';

export const PostsContainer = React.memo(() => (
    <PostsWrapper>
        {useList($idsList, id => (
            <PostWrapper id={id}>
                <PostContainer id={id} />
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

                <NavLink href={`${ROUTES.POSTS}/${id}`} passHref>
                    {intl(INTL.POSTS.OPEN)}
                </NavLink>
            </Card.Actions>
        </Card.Main>
    );
});
