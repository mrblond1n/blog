import {createEvent} from 'effector';
import {TCommentDto} from 'types/dtos/comments.dto';

export const addComment = createEvent<TCommentDto>();
export const updateComment = createEvent<TCommentDto>();
export const clearCommentsIndex = createEvent<void>();
export const sendComment = createEvent<{text: string}>();
