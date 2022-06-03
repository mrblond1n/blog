import {TPostDto} from 'types/dtos/posts.dto';
import {createFirestoreRequest} from 'utils/requestFirestore';
import {createStorageRequest} from 'utils/requestStorage';

export const addPostRequest = (data: Omit<TPostDto, 'id' | 'watches_count' | 'comments_count'>) =>
    createFirestoreRequest({type: 'ADD', collection: 'posts', data});

export const getPostImageRequest = (post: TPostDto) => createStorageRequest({type: 'DOWNLOAD', url: post.img});

export const savePostImageRequest = ({url, file}: {url: string; file: any}) =>
    createStorageRequest({type: 'UPLOAD', url, file});

export const getPostsRequest = () => createFirestoreRequest({type: 'GET_LIST', collection: 'posts'});

export const removePostRequest = (id: string) => createFirestoreRequest({type: 'REMOVE', collection: 'posts', id});
