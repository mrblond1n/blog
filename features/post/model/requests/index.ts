import {createFirebaseRequest} from 'utils/request';

export const getPostRequest = (id: string) =>
    createFirebaseRequest({
        type: 'GET',
        collection: 'posts',
        id,
    });
