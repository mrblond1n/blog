import {sendCommentRequest, getCommentsRequest, sendReplyRequest} from 'features/post/comments/model/requests';
import {CommentCodec, CommentsCodec} from 'types/dtos/comments.dto';
import {createFirebaseEffect} from 'utils/requests/requestEffect';

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
