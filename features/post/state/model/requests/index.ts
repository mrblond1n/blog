import {TPostDto} from 'types/dtos/posts.dto';
import {createFirestoreRequest} from 'utils/requestFirestore';

export const getPostRequest = (id: string) => createFirestoreRequest('GET', 'posts', id);

export const updatePostRequest = (data: TPostDto) => createFirestoreRequest('SET', 'posts', data, data.id);
