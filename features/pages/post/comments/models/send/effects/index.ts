import {sendCommentRequest, sendReplyRequest} from 'features/pages/post/comments/models/send/requests';
import {CommentCodec} from 'types/dtos/comments.dto';
import {createFirebaseEffect} from 'utils/requests/requestEffect';

export const sendCommentFx = createFirebaseEffect({
    codec: CommentCodec,
    request: sendCommentRequest,
});

export const sendReplyFx = createFirebaseEffect({
    codec: CommentCodec,
    request: sendReplyRequest,
});
