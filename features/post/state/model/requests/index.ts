import {TPostDto} from 'types/dtos/posts.dto';
import {createFirebaseRequest} from 'utils/request';

export const getPostRequest = (id: string) =>
    createFirebaseRequest({
        type: 'GET',
        collection: 'posts',
        id,
    });

export const updatePostRequest = (data: TPostDto) =>
    createFirebaseRequest({
        type: 'SET',
        collection: 'posts',
        id: data.id,
        data,
    });
