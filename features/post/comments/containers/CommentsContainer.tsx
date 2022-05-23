import {useList, useStoreMap} from 'effector-react';
import {$commentsIndex, $idsList} from 'features/post/comments/model/stores';
import {AvatarWrapper} from 'features/post/comments/ui/atoms/AvatarWrapper';
import {CommentBodyWrapper} from 'features/post/comments/ui/atoms/CommentBodyWrapper';
import {CommentHeaderWrapper} from 'features/post/comments/ui/atoms/CommentHeaderWrapper';
import {CommentWrapper} from 'features/post/comments/ui/atoms/CommentWrapper';
import {formattedDate} from 'features/post/comments/utils/date';
import {getInitials} from 'features/post/comments/utils/initials';

import React from 'react';
import {Caption} from 'ui/atoms/Caption';
import {Row} from 'ui/atoms/Row';

export const CommentsContainer = React.memo(() => useList($idsList, id => <CommentContainer id={id} />));

type TProps = {
    id: string;
};
const CommentContainer = React.memo(({id}: TProps) => {
    const comment = useStoreMap({
        store: $commentsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });
    const date = formattedDate(comment.created_at);
    const initials = getInitials(comment.author);

    return (
        <CommentWrapper>
            <AvatarWrapper>{initials}</AvatarWrapper>

            <Row direction="column">
                <CommentHeaderWrapper>
                    <b>{comment.author}</b>

                    <Caption>{date}</Caption>
                </CommentHeaderWrapper>

                <CommentBodyWrapper>{comment.text}</CommentBodyWrapper>
            </Row>
        </CommentWrapper>
    );
});
