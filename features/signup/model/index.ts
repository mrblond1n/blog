import {guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {forward} from 'effector/effector.mjs';
import {setAppState} from 'features/common/app/model/events';
import {$appState} from 'features/common/app/model/stores';
import {$formElem} from 'features/common/form/model';
import {onReset, onSubmit} from 'features/common/form/model/events';
import {$form, $inputsApi} from 'features/common/form/model/stores';
import {toMain} from 'features/common/navigation/model/events';
import {signUpFx} from 'features/signup/model/effects';

export const Gate = createGate();

guard({
    clock: Gate.open,
    source: $appState,
    filter: state => state === 'AUTHORIZED',
    target: toMain,
});

forward({
    from: Gate.open,
    to: $inputsApi.setSignUpInputs,
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

forward({
    from: signUpFx.doneData,
    to: [setAppState.prepend(() => 'AUTHORIZED'), toMain],
});

sample({
    clock: Gate.open,
    source: $formElem,
    filter: Boolean,
    target: onReset,
});
