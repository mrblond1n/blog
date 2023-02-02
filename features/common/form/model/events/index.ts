import {createEvent} from 'effector';
import {FormEvent} from 'react';
import {TField, TValue} from 'types';

export const addFields = createEvent<TField[]>();
export const addField = createEvent<TField>();
export const onChange = createEvent<{key: string; value: TValue}>();
export const clearValues = createEvent();

export const resetForm = createEvent();
export const submitForm = createEvent<FormEvent<HTMLFormElement>>();
export const onSubmit = createEvent<void>();
