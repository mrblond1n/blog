import {getCommentsRequest} from 'features/post/comments/model/requests';
import {CommentsCodec} from 'types/dtos/comments.dto';
import {createFirebaseEffect} from 'utils/requestEffect';

export const getCommentsFx = createFirebaseEffect({
    codec: CommentsCodec,
    request: getCommentsRequest,
});
