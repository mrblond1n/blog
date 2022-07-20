import {TPostDto} from 'types/dtos/posts.dto';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

export const getPostRequest = (id: string) => createFirestoreRequest('GET', 'posts', id);

export const updatePostWatchesRequest = ({id, ...data}: Pick<TPostDto, 'id' | 'watches_count'>) =>
    createFirestoreRequest('UPDATE', 'posts', data, id);

export const updatePostCommentsRequest = ({id, ...data}: Pick<TPostDto, 'id' | 'comments_count'>) =>
    createFirestoreRequest('UPDATE', 'posts', data, id);
