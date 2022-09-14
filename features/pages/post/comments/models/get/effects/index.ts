import {getCommentsRequest} from 'features/pages/post/comments/models/get/requests';
import {CommentsCodec} from 'types/dtos/comments.dto';
import {createFirebaseEffect} from 'utils/requests/requestEffect';

export const getCommentsFx = createFirebaseEffect({
    codec: CommentsCodec,
    request: getCommentsRequest,
});
