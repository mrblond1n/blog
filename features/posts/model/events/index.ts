import {createEvent} from 'effector';
import {TPostDto} from 'types/dtos/posts.dto';

export const getPosts = createEvent<void>();

export const addPost = createEvent<TPostDto>();
export const addNewPost = createEvent<TPostDto>();
export const removePost = createEvent<string>();

export const clearIndexes = createEvent<void>();

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS';
export const setMode = createEvent<TMode>();
