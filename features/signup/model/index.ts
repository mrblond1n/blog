import {guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {forward} from 'effector/effector.mjs';
import {$appState} from 'features/app/model/stores';
import {$formElem} from 'features/form/model';
import {onReset, onSubmit} from 'features/form/model/events';
import {$form, $inputsApi, changeButtonText} from 'features/form/model/stores';
import {toMain} from 'features/navigation/model/events';
import {signUpFx} from 'features/signin/model/effects';

export const Gate = createGate();

guard({
    clock: Gate.open,
    source: $appState,
    filter: state => state === 'AUTHORIZED',
    target: toMain,
});

forward({
    from: Gate.open,
    to: [changeButtonText.toSignUp, $inputsApi.setSignUpInputs],
});

sample({
    clock: onSubmit,
    source: $form,
    filter: Gate.status,
    fn: data => {
        if (data.password === data.confirmPassword) return data;
        throw new Error('no correct data');
    },
    target: signUpFx,
});

sample({
    clock: Gate.open,
    source: $formElem,
    filter: Boolean,
    target: onReset,
});
