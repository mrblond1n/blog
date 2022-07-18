import {useList, useStoreMap} from 'effector-react';
import {$replyIdsIndex} from 'features/common/comments/reply/model/stores';
import {CommentContainer} from 'features/common/comments/state/containers/CommentContainer';
import {$discussionIdsList, $discussionIdsIndex} from 'features/common/comments/state/model/stores';
import {DiscussionWrapper} from 'features/common/comments/state/ui/atoms/DiscussionWrapper';
import {getUniqueArray} from 'features/common/comments/state/utils';
import React from 'react';

export const CommentsContainer = React.memo(() => useList($discussionIdsList, id => <DiscussionContainer id={id} />));

const DiscussionContainer = React.memo(({id}: {id: string}) => {
    const idsList = useStoreMap({
        store: $discussionIdsIndex,
        keys: [id],
        defaultValue: [],
        fn: (state, [id]) => state[id],
    });

    const replyIdsList = useStoreMap({
        store: $replyIdsIndex,
        keys: [id],
        defaultValue: [],
        fn: (state, [id]) => state[id],
    });

    const uniqueIdsList = React.useMemo(() => getUniqueArray(idsList, replyIdsList), [replyIdsList, idsList]);

    return (
        <DiscussionWrapper>
            <CommentContainer id={id} />

            {uniqueIdsList.map(id => (
                <CommentContainer key={id} id={id} />
            ))}
        </DiscussionWrapper>
    );
});
