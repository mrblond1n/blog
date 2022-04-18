import {createEvent} from 'effector';
import React from 'react';

export const fieldSet = createEvent<{key: string; value: string}>();

export const onChange = createEvent<React.ChangeEvent<HTMLInputElement>>();
export const onReset = createEvent<void>();
export const onSubmit = createEvent<void>();

type TState = 'SIGN_IN' | 'SIGN_UP';
export const setState = createEvent<TState>();
export const onSwitch = createEvent<void>();

export const signIn = createEvent<void>();
export const signUp = createEvent<void>();
export const signOut = createEvent<void>();
