import {
    sendCommentRequest,
    getCommentsRequest,
    sendReplyRequest,
    updateCommentRequest,
    updateCommentRepliesRequest,
} from 'features/post/comments/model/requests';
import {CommentCodec, CommentsCodec} from 'types/dtos/comments.dto';
import {createFirebaseEffect} from 'utils/requests/requestEffect';
import {t} from 'utils/validation';

export const sendCommentFx = createFirebaseEffect({
    codec: CommentCodec,
    request: sendCommentRequest,
});

export const sendReplyFx = createFirebaseEffect({
    codec: CommentCodec,
    request: sendReplyRequest,
});

export const getCommentsFx = createFirebaseEffect({
    codec: CommentsCodec,
    request: getCommentsRequest,
});

export const updateCommentFx = createFirebaseEffect({
    codec: CommentCodec,
    request: updateCommentRequest,
});

export const updateCommentRepliesFx = createFirebaseEffect({
    codec: t.boolean,
    request: updateCommentRepliesRequest,
});
