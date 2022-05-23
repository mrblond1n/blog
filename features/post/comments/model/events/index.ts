import {createEvent} from 'effector';

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS';
export const setMode = createEvent<TMode>();
