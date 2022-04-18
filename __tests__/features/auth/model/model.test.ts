import {fieldSet, onReset, setState} from 'features/auth/model/events';
import {$form, $inputs, $state, signInInputs, signUpInputs} from 'features/auth/model/stores';

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

    test('should reset $form after send data', () => {
        fieldSet(fieldData);
        onReset();

        expect($form.getState()).toEqual({});
    });
});

describe('$state', () => {
    test('should be SIGN_IN on start', () => {
        expect($state.getState()).toBe('SIGN_IN');
    });

    test('should be SIGN_UP on start', () => {
        setState('SIGN_UP');
        expect($state.getState()).toBe('SIGN_UP');
    });
});

describe('$inputs', () => {
    test('should be signInInputs on start', () => {
        setState('SIGN_IN');
        expect($inputs.getState()).toEqual(signInInputs);
    });

    test('should be signUpInputs on start', () => {
        setState('SIGN_UP');
        expect($inputs.getState()).toEqual(signUpInputs);
    });
});
