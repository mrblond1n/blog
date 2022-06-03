import {TPostDto} from 'types/dtos/posts.dto';
import {createFirestoreRequest} from 'utils/requestFirestore';

export const addPostRequest = (data: Omit<TPostDto, 'id' | 'watches_count' | 'comments_count'>) =>
    createFirestoreRequest({type: 'ADD', collection: 'posts', data});

export const getPostsRequest = () => createFirestoreRequest({type: 'GET_LIST', collection: 'posts'});

export const removePostRequest = (id: string) => createFirestoreRequest({type: 'REMOVE', collection: 'posts', id});
