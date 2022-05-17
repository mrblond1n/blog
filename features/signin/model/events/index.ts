import {createEvent} from 'effector';

type TState = 'SIGN_IN' | 'SIGN_UP';
export const setState = createEvent<TState>();
export const onSwitch = createEvent<void>();

export const signIn = createEvent<void>();
export const signUp = createEvent<void>();
export const signOut = createEvent<void>();
