import {TCommentDto} from 'types/dtos/comments.dto';
import {createFirestoreRequest} from 'utils/requestFirestore';

export const sendCommentRequest = ({id, ...data}: Omit<TCommentDto, 'created_at'>) =>
    createFirestoreRequest({
        collection: `posts/${id}/comments`,
        data,
        type: 'ADD',
    });

export const getCommentsRequest = (id: string) =>
    createFirestoreRequest({
        type: 'GET_LIST',
        collection: `posts/${id}/comments`,
    });
