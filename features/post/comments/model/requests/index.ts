import {TCommentDto} from 'types/dtos/comments.dto';
import {createFirebaseRequest} from 'utils/request';

export const sendCommentRequest = ({id, ...data}: Omit<TCommentDto, 'created_at'>) =>
    createFirebaseRequest({
        collection: `posts/${id}/comments`,
        data,
        type: 'ADD',
    });

export const getCommentsRequest = (id: string) =>
    createFirebaseRequest({
        type: 'GET_LIST',
        collection: `posts/${id}/comments`,
    });
