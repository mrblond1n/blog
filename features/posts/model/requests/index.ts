import {createFirebaseRequest} from 'utils/request';

export const addPostRequest = (data: {[key: string]: string}) =>
    createFirebaseRequest({type: 'ADD', collection: 'posts', data});

export const getPostsRequest = () => createFirebaseRequest({type: 'GET_LIST', collection: 'posts'});

export const removePostRequest = (id: string) => createFirebaseRequest({type: 'REMOVE', collection: 'posts', id});
