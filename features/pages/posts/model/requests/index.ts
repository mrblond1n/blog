import {LIMITS} from 'constants/business';
import {TPostDto} from 'types/dtos/posts.dto';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';
import {createStorageRequest} from 'utils/requests/requestStorage';

export const addPostRequest = (data: Omit<TPostDto, 'id' | 'watches_count' | 'comments_count' | 'created_at'>) =>
    createFirestoreRequest('ADD', 'posts', data);

export const savePostImageRequest = ({url, file}: {url: string; file: any}) =>
    createStorageRequest('UPLOAD', url, file);

export const getPostsRequest = () =>
    createFirestoreRequest('GET_LIST', 'posts', {order: ['created_at', 'desc'], limit: LIMITS.POSTS});

export const removePostRequest = (id: string) => createFirestoreRequest('REMOVE', 'users', id);
