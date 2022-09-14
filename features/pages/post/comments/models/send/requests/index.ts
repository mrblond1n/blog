import {TCommentDto} from 'types/dtos/comments.dto';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

type TCommonOpinionProps = 'created_at' | 'replies' | 'liked' | 'disliked';

type TSendCommentRequest = Omit<TCommentDto, TCommonOpinionProps | 'reply_id' | 'discussion_id'>;
export const sendCommentRequest = ({id, ...data}: TSendCommentRequest) =>
    createFirestoreRequest('ADD', `posts/${id}/comments`, data);

type TSendReplyRequest = Omit<TCommentDto, TCommonOpinionProps>;
export const sendReplyRequest = ({id, ...data}: TSendReplyRequest) => {
    return createFirestoreRequest('ADD', `posts/${id}/comments/${data.discussion_id}/comments`, data);
};
