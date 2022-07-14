import {useList, useStoreMap} from 'effector-react';
import {AnswerFieldContainer} from 'features/post/comments/containers/AnswerFieldContainer';
import {onAnswer} from 'features/post/comments/model/events';
import {$commentsIdsList, $commentsIndex, $replyIdsIndex} from 'features/post/comments/model/stores';
import {CommentWrapper} from 'features/post/comments/ui/atoms/CommentWrapper';
import {formattedDate, getInitials} from 'features/post/utils';

import React from 'react';
import {Avatar} from 'ui/atoms/Avatar';
import {Button} from 'ui/atoms/Button';
import {Card} from 'ui/atoms/Card';

export const CommentsContainer = React.memo(() => useList($commentsIdsList, id => <ConversationContainer id={id} />));

const ConversationContainer = React.memo(({id}: {id: string}) => {
    const idsList = useStoreMap({
        store: $replyIdsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    return (
        <div>
            <CommentContainer id={id} />

            <div style={{marginLeft: '24px'}}>
                {idsList.map(id => (
                    <CommentContainer key={id} id={id} />
                ))}
            </div>
        </div>
    );
});

const CommentContainer = React.memo(({id}: {id: string}) => {
    const comment = useStoreMap({
        store: $commentsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const date = formattedDate(comment.created_at);
    const initials = getInitials(comment.author);

    const handleClick = React.useCallback(() => onAnswer(id), [id]);

    return (
        <CommentWrapper>
            <Card.Header avatar={<Avatar>{initials}</Avatar>} subheader={date} title={comment.author} />

            <Card.Content>{comment.text}</Card.Content>

            <Card.Actions>
                <Button onClick={handleClick}>{'answer'}</Button>
            </Card.Actions>

            <AnswerFieldContainer id={id} />
        </CommentWrapper>
    );
});
