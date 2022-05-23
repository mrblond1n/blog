import {useList, useStoreMap} from 'effector-react';
import {$commentsIndex, $idsList} from 'features/post/comments/model/stores';

import React from 'react';
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

    return (
        <Row>
            {comment.author}
            {'comment - '}
            {comment.text}
        </Row>
    );
});
