import {useList, useStoreMap} from 'effector-react';
import {$commentsIndex, $idsList} from 'features/post/comments/model/stores';

import React from 'react';

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
        <div>
            {'comment - '}
            {comment.text}
        </div>
    );
});
