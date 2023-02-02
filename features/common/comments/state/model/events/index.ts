import {createEvent} from 'effector';
import {TData} from 'types';
import {TCommentDto} from 'types/dtos/comments.dto';

export const addComment = createEvent<TCommentDto>();
export const removeComment = createEvent<TCommentDto>();

export const getCommentsCollection = createEvent<TCommentDto[]>();
export const getRemovedComments = createEvent<TCommentDto[]>();

export const clearComments = createEvent<void>();

export const clearDiscussion = createEvent<string>();
export const sendComment = createEvent<TData>();
