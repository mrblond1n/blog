import {createEvent} from 'effector';
import {TCommentDto} from 'types/dtos/comments.dto';

export const addComment = createEvent<TCommentDto>();
export const clearCommentsIndex = createEvent<void>();
export const sendComment = createEvent<Omit<TCommentDto, 'id' | 'created_at' | 'reply_id' | 'parent_id'>>();
