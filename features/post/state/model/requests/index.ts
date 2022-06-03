import {TPostDto} from 'types/dtos/posts.dto';
import {createFirestoreRequest} from 'utils/requestFirestore';

export const getPostRequest = (id: string) =>
    createFirestoreRequest({
        type: 'GET',
        collection: 'posts',
        id,
    });

export const updatePostRequest = (data: TPostDto) =>
    createFirestoreRequest({
        type: 'SET',
        collection: 'posts',
        id: data.id,
        data,
    });
