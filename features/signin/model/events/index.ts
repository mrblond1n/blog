import {createEvent} from 'effector';

type TState = 'SIGN_IN' | 'SIGN_UP';
export const setState = createEvent<TState>();
export const signOut = createEvent<void>();
