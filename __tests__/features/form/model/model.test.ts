import {fieldSet} from 'features/form/model/events';
import {$form, $inputs, $inputsApi, createPostInputs, signInInputs, signUpInputs} from 'features/form/model/stores';

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
    test('should be signInInputs on start', () => {
        $inputsApi.setSignInInputs();
        expect($inputs.getState()).toEqual(signInInputs);
    });

    test('should be signUpInputs on start', () => {
        $inputsApi.setSignUpInputs();
        expect($inputs.getState()).toEqual(signUpInputs);
    });

    test('should be signUpInputs on start', () => {
        $inputsApi.setCreatePostInputs();
        expect($inputs.getState()).toEqual(createPostInputs);
    });
});
