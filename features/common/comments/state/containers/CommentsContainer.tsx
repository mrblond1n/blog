import {useList, useStoreMap} from 'effector-react';
import {CommentContainer} from 'features/common/comments/state/containers/CommentContainer';
import {$idsList, $idsIndex} from 'features/common/comments/state/model/stores';
import {DiscussionWrapper} from 'features/common/comments/state/ui/atoms/DiscussionWrapper';
import React from 'react';

export const CommentsContainer = React.memo(() => useList($idsList, id => <DiscussionContainer id={id} />));

const DiscussionContainer = React.memo(({id}: {id: string}) => {
    const idsList = useStoreMap({
        store: $idsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    return (
        <DiscussionWrapper>
            <CommentContainer id={id} />

            {idsList.map(id => (
                <CommentContainer key={id} id={id} />
            ))}
        </DiscussionWrapper>
    );
});
