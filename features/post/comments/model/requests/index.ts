import {TComment} from 'types/dtos/comments.dto';
import {createFirebaseRequest} from 'utils/request';

export const addCommentRequest = (data: Omit<TComment, 'id'>) =>
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
