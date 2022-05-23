import {sendCommentRequest, getCommentsRequest} from 'features/post/comments/model/requests';
import {CommentCodec, CommentsCodec} from 'types/dtos/comments.dto';
import {createFirebaseEffect} from 'utils/requestEffect';

export const sendCommentFx = createFirebaseEffect({
    codec: CommentCodec,
    request: sendCommentRequest,
});

export const getCommentsFx = createFirebaseEffect({
    codec: CommentsCodec,
    request: getCommentsRequest,
});
