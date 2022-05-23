import {createEvent} from 'effector';
import {TCommentDto} from 'types/dtos/comments.dto';

export const addComment = createEvent<TCommentDto>();
export const sendComment = createEvent<string>();

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS';
export const setMode = createEvent<TMode>();
