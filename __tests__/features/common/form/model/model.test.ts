import {fieldSet} from 'features/common/form/model/events';
import {
    $form,
    $inputs,
    $inputsApi,
    createPostInputs,
    signInInputs,
    signUpInputs,
} from 'features/common/form/model/stores';

const fieldData = {key: 'example', value: 'example'};
const formField = {[fieldData.key]: fieldData.value};

describe('$form', () => {
    test('should $form to equal {} after Gate.open', () => {
        expect($form.getState()).toEqual({});
    });

    test(`should $form to equal ${JSON.stringify(formField)} after Gate.open`, () => {
        fieldSet(fieldData);
        expect($form.getState()).toEqual(formField);
    });
});

describe('$inputs', () => {
    test('should be inputs for sign in', () => {
        $inputsApi.setSignInInputs();
        expect($inputs.getState()).toEqual(signInInputs);
    });

    test('should be inputs for sign up', () => {
        $inputsApi.setSignUpInputs();
        expect($inputs.getState()).toEqual(signUpInputs);
    });

    test('should be inputs for create post', () => {
        $inputsApi.setCreatePostInputs();
        expect($inputs.getState()).toEqual(createPostInputs);
    });
});
