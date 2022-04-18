import {createStore, restore} from 'effector';
import {fieldSet, onReset, setState} from 'features/auth/model/events';
import {createIndex} from 'utils/stack';

export const $state = restore(setState, 'SIGN_IN');

export const $form = createStore(createIndex<string>())
    .on(fieldSet, (index, {key, value}) => index.set({key, value}))
    .on(onReset, index => index.clear())
    .map(value => value.getRaw());

export const signInInputs = [
    {name: 'email', placeholder: 'E-mail', required: true, type: 'email'},
    {name: 'password', placeholder: 'Password', required: true, type: 'password'},
];

export const signUpInputs = [
    {name: 'firstName', placeholder: 'First name', required: true, type: 'text'},
    {name: 'lastName', placeholder: 'Last name', required: true, type: 'text'},
    {name: 'email', placeholder: 'E-mail', required: true, type: 'email'},
    {name: 'password', placeholder: 'Password', required: true, type: 'password'},
    {name: 'confirmPassword', placeholder: 'Repeat password', required: true, type: 'password'},
];

type TInputs = typeof signInInputs | typeof signUpInputs;
export const $inputs = createStore<TInputs>(signInInputs).on(setState, (_, state) =>
    state === 'SIGN_IN' ? signInInputs : signUpInputs
);
