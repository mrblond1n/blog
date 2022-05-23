import {createEvent} from 'effector';

export const addComment = createEvent<string>();

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS';
export const setMode = createEvent<TMode>();
