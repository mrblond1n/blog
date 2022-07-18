import {useStoreMap} from 'effector-react';
import {ButtonContainer} from 'features/common/comments/reply/containers/ButtonContainer';
import {FieldContainer} from 'features/common/comments/reply/containers/FieldContainer';
import {ToggleButtonContainer} from 'features/common/comments/reply/containers/ToggleButtonContainer';
import {$commentsIndex} from 'features/common/comments/state/model/stores';
import {CommentBodyWrapper} from 'features/common/comments/state/ui/atoms/CommentBodyWrapper';
import {CommentFooterWrapper} from 'features/common/comments/state/ui/atoms/CommentFooterWrapper';
import {CommentHeaderWrapper} from 'features/common/comments/state/ui/atoms/CommentHeaderWrapper';
import {CommentMainWrapper} from 'features/common/comments/state/ui/atoms/CommentMainWrapper';
import {CommentWrapper} from 'features/common/comments/state/ui/atoms/CommentWrapper';
import {getInitials} from 'features/common/comments/state/utils';
import React from 'react';
import {Avatar} from 'ui/atoms/Avatar';
import {Body} from 'ui/atoms/Body';
import {Caption} from 'ui/atoms/Caption';
import {dateFromNow} from 'utils/date';

export const CommentContainer = React.memo(({id}: {id: string}) => {
    const comment = useStoreMap({
        store: $commentsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const date = dateFromNow(comment.created_at);
    const initials = getInitials(comment.author);

    return (
        <CommentWrapper>
            <Avatar>{initials}</Avatar>

            <CommentMainWrapper>
                <CommentHeaderWrapper>
                    <Body>{comment.author}</Body>
                    <Caption>{date}</Caption>
                </CommentHeaderWrapper>

                <CommentBodyWrapper>{comment.text}</CommentBodyWrapper>

                <CommentFooterWrapper>
                    <ButtonContainer id={id} />
                </CommentFooterWrapper>

                <FieldContainer id={id} />
                <ToggleButtonContainer id={id} />
            </CommentMainWrapper>
        </CommentWrapper>
    );
});
