import {createEvent} from 'effector';
import {TPostDto} from 'types/dtos/posts.dto';

export const getPosts = createEvent<void>();
export const onClick = createEvent<void>();
export const addPost = createEvent<TPostDto>();
export const addNewPost = createEvent<{title: string; text: string}>();
export const removePost = createEvent<string>();

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS';
export const setMode = createEvent<TMode>();
