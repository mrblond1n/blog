import {TCommentDto} from 'types/dtos/comments.dto';
import {createFirebaseRequest} from 'utils/request';

export const sendCommentRequest = (data: Omit<TCommentDto, 'id' | 'created_at'>) =>
    createFirebaseRequest({
        collection: 'comments',
        data,
        type: 'ADD',
    });

export const getCommentsRequest = (id: string) =>
    createFirebaseRequest({
        type: 'GET_LIST',
        collection: 'comments',
        condition: ['post', '==', id],
    });
