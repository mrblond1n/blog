import {removeCommentRequest} from 'features/pages/post/comments/models/remove/requests';
import {createFirebaseEffect} from 'utils/requests/requestEffect';
import {t} from 'utils/validation';

export const removeCommentFx = createFirebaseEffect({
    codec: t.string,
    request: removeCommentRequest,
});
