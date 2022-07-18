import {TCommentDto} from 'types/dtos/comments.dto';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

type TSendCommentRequest = Omit<TCommentDto, 'created_at' | 'replies' | 'reply_id' | 'discussion_id'>;
export const sendCommentRequest = ({id, ...data}: TSendCommentRequest) =>
    createFirestoreRequest('ADD', `posts/${id}/comments`, data);

type TSendReplyRequest = Omit<TCommentDto, 'created_at' | 'replies'>;
export const sendReplyRequest = ({id, ...data}: TSendReplyRequest) => {
    return createFirestoreRequest('ADD', `posts/${id}/comments/${data.discussion_id}/comments`, data);
};

type TUpdateCommentRequest = TCommentDto & {postId: string};
export const updateCommentRequest = ({postId, ...data}: TUpdateCommentRequest) => {
    return createFirestoreRequest('SET', `posts/${postId}/comments`, data, data.id);
};

export const getCommentsRequest = (id: string) => createFirestoreRequest('GET_LIST', `posts/${id}/comments`);
