import {createEvent} from 'effector';

type TAppState = 'INITIAL_LOADING' | 'AUTHORIZED' | 'UNAUTHORIZED';
export const setAppState = createEvent<TAppState>();
