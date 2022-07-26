import {createEvent} from 'effector';
import {TPostDto} from 'types/dtos/posts.dto';

export const getPosts = createEvent<void>();

export const addPost = createEvent<TPostDto>();
export const addNewPost = createEvent<TPostDto>();
export const removePost = createEvent<string>();

export const onRemove = createEvent<string>();

export const resetDisable = createEvent<string>();
export const clearIndex = createEvent<void>();

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS' | 'NOT_FOUND';
export const setMode = createEvent<TMode>();
