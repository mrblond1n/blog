import {TPostDto} from 'types/dtos/posts.dto';
import {createFirebaseRequest} from 'utils/request';

export const addPostRequest = (data: Omit<TPostDto, 'id' | 'watches_count' | 'comments_count'>) =>
    createFirebaseRequest({type: 'ADD', collection: 'posts', data});

export const getPostsRequest = () => createFirebaseRequest({type: 'GET_LIST', collection: 'posts'});

export const removePostRequest = (id: string) => createFirebaseRequest({type: 'REMOVE', collection: 'posts', id});
