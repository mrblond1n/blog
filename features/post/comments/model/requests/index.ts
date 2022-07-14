import {TCommentDto} from 'types/dtos/comments.dto';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

export const sendCommentRequest = ({id, ...data}: Omit<TCommentDto, 'created_at'>) =>
    createFirestoreRequest('ADD', `posts/${id}/comments`, data);

export const getCommentsRequest = (id: string) => createFirestoreRequest('GET_LIST', `posts/${id}/comments`);
