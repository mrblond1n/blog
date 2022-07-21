import {createEvent} from 'effector';
import {TCommentDto} from 'types/dtos/comments.dto';

export const addComment = createEvent<TCommentDto>();
export const updateComment = createEvent<TCommentDto>();
export const removeComment = createEvent<TCommentDto>();

export const clearComments = createEvent<void>();

export const clearDiscussion = createEvent<string>();
export const sendComment = createEvent<{text: string}>();
