import {createApi, createStore, restore} from 'effector';
import {fieldSet, resetForm, setInputs} from 'features/common/form/model/events';
import {FormGate} from 'features/common/form/model/index';
import {createIndex} from 'utils/stack';

export const $form = createStore(createIndex<string>())
    .on(fieldSet, (index, {key, value}) => index.set({key, value}))
    .on(resetForm, index => index.clear())
    .map(value => value.getRaw());

export const signInInputs = [
    {name: 'email', label: 'E-mail', required: true, type: 'email'},
    {name: 'password', label: 'Password', required: true, type: 'password'},
];

export const signUpInputs = [
    {autoComplete: 'off', name: 'firstName', label: 'First name', required: true, type: 'text'},
    {autoComplete: 'off', name: 'lastName', label: 'Last name', required: true, type: 'text'},
    {name: 'email', label: 'E-mail', required: true, type: 'email'},
    {name: 'password', label: 'Password', required: true, type: 'password'},
    {name: 'confirmPassword', label: 'Repeat password', required: true, type: 'password'},
];

export const createPostInputs = [
    {name: 'title', required: true, type: 'text', label: 'Title'},
    {name: 'text', required: true, type: 'text', label: 'Text'},
    {name: 'img', required: true, type: 'file', label: '', inputProps: {'aria-label': 'image'}},
];

export const addCommentInputs = [{name: 'text', label: 'Comment', required: true, type: 'textarea'}];

export const $inputs = restore(setInputs, []).reset(FormGate.close);
export const $inputsApi = createApi($inputs, {
    setSignInInputs: () => signInInputs,
    setSignUpInputs: () => signUpInputs,
    setCreatePostInputs: () => createPostInputs,
    setAddCommentInputs: () => addCommentInputs,
});
