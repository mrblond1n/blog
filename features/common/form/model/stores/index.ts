import {createApi, createStore, restore} from 'effector';
import {fieldSet, onReset, setInputs} from 'features/common/form/model/events';
import {FormGate} from 'features/common/form/model/index';
import {createIndex} from 'utils/stack';

export const $form = createStore(createIndex<string>())
    .on(fieldSet, (index, {key, value}) => index.set({key, value}))
    .on(onReset, index => index.clear())
    .map(value => value.getRaw());

export const signInInputs = [
    {name: 'email', placeholder: 'E-mail', required: true, type: 'email'},
    {name: 'password', placeholder: 'Password', required: true, type: 'password'},
];

export const signUpInputs = [
    {autoComplete: 'off', name: 'firstName', placeholder: 'First name', required: true, type: 'text'},
    {autoComplete: 'off', name: 'lastName', placeholder: 'Last name', required: true, type: 'text'},
    {name: 'email', placeholder: 'E-mail', required: true, type: 'email'},
    {name: 'password', placeholder: 'Password', required: true, type: 'password'},
    {name: 'confirmPassword', placeholder: 'Repeat password', required: true, type: 'password'},
];

export const createPostInputs = [
    {name: 'title', placeholder: 'Title', required: true, type: 'text'},
    {name: 'text', placeholder: 'Text', required: true, type: 'text'},
];

export const $inputs = restore(setInputs, []).reset(FormGate.close);
export const $inputsApi = createApi($inputs, {
    setSignInInputs: () => signInInputs,
    setSignUpInputs: () => signUpInputs,
    setCreatePostInputs: () => createPostInputs,
});
