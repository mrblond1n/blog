import {TCommentDto} from 'types/dtos/comments.dto';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

export const removeCommentRequest = ({id, path}: Pick<TCommentDto, 'id'> & {path: string}) =>
    createFirestoreRequest('REMOVE', `posts/${path}/comments`, id);
