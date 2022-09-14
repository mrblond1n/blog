import {TCommentDto} from 'types/dtos/comments.dto';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

type TUpdateCommentLikesRequest = Pick<TCommentDto, 'id' | 'liked' | 'disliked'> & {path: string};
export const updateCommentLikesRequest = ({path, ...data}: TUpdateCommentLikesRequest) => {
    return createFirestoreRequest('UPDATE', `posts/${path}/comments`, data, data.id);
};

type TUpdateCommentRepliesRequest = Pick<TCommentDto, 'id' | 'replies'> & {path: string};
export const updateCommentRepliesRequest = ({path, ...data}: TUpdateCommentRepliesRequest) => {
    return createFirestoreRequest('UPDATE', `posts/${path}/comments`, data, data.id);
};
