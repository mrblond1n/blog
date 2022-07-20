import {useStoreMap} from 'effector-react';
import {ButtonDislikeContainer} from 'features/common/comments/liked/containers/ButtonDislikeContainer';
import {ButtonLikeContainer} from 'features/common/comments/liked/containers/ButtonLikeContainer';
import {ButtonContainer} from 'features/common/comments/reply/containers/ButtonContainer';
import {FieldContainer} from 'features/common/comments/reply/containers/FieldContainer';
import {SendButtonContainer} from 'features/common/comments/reply/containers/SendButtonContainer';
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
import {Row} from 'ui/atoms/Row';
import {dateFromNow} from 'utils/date';

export const CommentContainer = React.memo(({id}: {id: string}) => {
    return (
        <CommentWrapper>
            <CommentAvatar id={id} />

            <CommentMainWrapper>
                <CommentHeader id={id} />

                <CommentBodyContainer id={id} />

                <CommentFooter id={id} />

                <CommentActions id={id} />
            </CommentMainWrapper>
        </CommentWrapper>
    );
});

export const CommentBodyContainer = React.memo(({id}: {id: string}) => {
    const comment = useStoreMap({
        store: $commentsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    return <CommentBodyWrapper>{comment.text}</CommentBodyWrapper>;
});

const CommentAvatar = React.memo(({id}: {id: string}) => {
    const comment = useStoreMap({
        store: $commentsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const initials = getInitials(comment.author);

    return <Avatar>{initials}</Avatar>;
});

const CommentHeader = React.memo(({id}: {id: string}) => {
    const comment = useStoreMap({
        store: $commentsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const date = dateFromNow(comment.created_at);

    return (
        <CommentHeaderWrapper>
            <Body>{comment.author}</Body>
            <Caption>{date}</Caption>
        </CommentHeaderWrapper>
    );
});

const CommentFooter = React.memo(({id}: {id: string}) => {
    return (
        <CommentFooterWrapper>
            <ButtonLikeContainer id={id} />
            <ButtonDislikeContainer id={id} />
            <ButtonContainer id={id} />
        </CommentFooterWrapper>
    );
});

const CommentActions = React.memo(({id}: {id: string}) => {
    return (
        <Row direction="column" fullWidth margin>
            <FieldContainer id={id} />
            <SendButtonContainer id={id} />
            <ToggleButtonContainer id={id} />
        </Row>
    );
});
