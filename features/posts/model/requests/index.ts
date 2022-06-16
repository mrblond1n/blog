import {TPostDto} from 'types/dtos/posts.dto';
import {createFirestoreRequest} from 'utils/requestFirestore';
import {createStorageRequest} from 'utils/requestStorage';

export const addPostRequest = (data: Omit<TPostDto, 'id' | 'watches_count' | 'comments_count'>) =>
    createFirestoreRequest('ADD', 'posts', data);

export const savePostImageRequest = ({url, file}: {url: string; file: any}) =>
    createStorageRequest({type: 'UPLOAD', url, file});

export const getPostsRequest = () => createFirestoreRequest('GET_LIST', 'posts');

export const removePostRequest = (id: string) => createFirestoreRequest('REMOVE', 'users', id);
