import {createApi, createStore, restore} from 'effector';
import {fieldSet, resetForm, setInputs} from 'features/common/form/model/events';
import {FormGate} from 'features/common/form/model/index';
import {createIndex} from 'utils/stack';

export const $form = createStore(createIndex<string>())
    .on(fieldSet, (index, {key, value}) => index.set({key, value}))
    .on(resetForm, index => index.clear())
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
    {name: 'title', placeholder: 'Title', required: true, type: 'text', label: 'title'},
    {name: 'text', placeholder: 'Text', required: true, type: 'text', label: 'text'},
    {name: 'img', placeholder: 'Image', required: true, type: 'file'},
];

export const addCommentInputs = [{name: 'text', placeholder: 'Comment', required: true, type: 'textarea'}];

export const $inputs = restore(setInputs, []).reset(FormGate.close);
export const $inputsApi = createApi($inputs, {
    setSignInInputs: () => signInInputs,
    setSignUpInputs: () => signUpInputs,
    setCreatePostInputs: () => createPostInputs,
    setAddCommentInputs: () => addCommentInputs,
});
