import {createFirebaseRequest} from 'utils/request';

export const getCommentsRequest = (id: string) =>
    createFirebaseRequest({
        type: 'GET_LIST',
        collection: 'comments',
        condition: ['post', '==', id],
    });
