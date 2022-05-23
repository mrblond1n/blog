import {addCommentRequest, getCommentsRequest} from 'features/post/comments/model/requests';
import {CommentCodec, CommentsCodec} from 'types/dtos/comments.dto';
import {createFirebaseEffect} from 'utils/requestEffect';

export const addCommentFx = createFirebaseEffect({
    codec: CommentCodec,
    request: addCommentRequest,
});

export const getCommentsFx = createFirebaseEffect({
    codec: CommentsCodec,
    request: getCommentsRequest,
});
