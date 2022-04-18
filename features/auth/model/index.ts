import {sample, split} from 'effector';
import {createGate} from 'effector-react';
import {forward} from 'effector/effector.mjs';
import {signInFx, signUpFx} from 'features/auth/model/effects';
import {fieldSet, onChange, onReset, onSubmit, onSwitch, setState, signIn, signUp} from 'features/auth/model/events';
import {$form, $state} from 'features/auth/model/stores';

export const Gate = createGate();

sample({
    clock: onChange,
    fn: e => ({key: e.target.name, value: e.target.value}),
    target: fieldSet,
});

split({
    source: sample({
        clock: onSubmit,
        source: $state,
    }),
    match: {
        isSignInState: state => state === 'SIGN_IN',
    },
    cases: {
        isSignInState: signIn,
        __: signUp,
    },
});

sample({
    clock: signIn,
    source: $form,
    target: signInFx,
});

sample({
    clock: signUp,
    source: $form,
    fn: data => {
        if (data.password === data.confirmPassword) return data;
        throw new Error('no correct data');
    },
    target: signUpFx,
});

sample({
    clock: onSwitch,
    source: $state,
    fn: state => (state === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN'),
    target: setState,
});

forward({
    from: [signInFx.doneData, signUpFx.doneData, onSwitch, Gate.open],
    to: onReset,
});
