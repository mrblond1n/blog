import {useStore} from 'effector-react';
import {$author, $body, $createdAt, $img, $title} from 'features/post/state/model/stores';
import {PostContent} from 'features/post/state/ui/molecules/PostContent';
import {PostHeader} from 'features/post/state/ui/molecules/PostHeader';
import {PostMedia} from 'features/post/state/ui/molecules/PostMedia';
import {concatStrings, formattedDate, getInitials} from 'features/post/utils';
import React from 'react';
import {Card} from 'ui/atoms/Card';

export const PostContainer = () => {
    const author = useStore($author);
    const body = useStore($body);
    const title = useStore($title);
    const img = useStore($img);
    const createdAt = useStore($createdAt);

    const date = formattedDate(createdAt);

    const headerTitle = React.useMemo(() => concatStrings(author, date), [author, date]);
    const initials = React.useMemo(() => getInitials(author), [author]);

    return (
        <Card.Main>
            <PostHeader initials={initials} subtitle={headerTitle} title={title} />
            <PostMedia img={img} />

            <PostContent text={body} title={title} />
        </Card.Main>
    );
};
