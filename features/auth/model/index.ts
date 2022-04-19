import {guard, sample, split} from 'effector';
import {createGate} from 'effector-react';
import {forward} from 'effector/effector.mjs';
import {setAppState} from 'features/app/model/events';
import {$appState} from 'features/app/model/stores';
import {signInFx, signOutFx, signUpFx} from 'features/auth/model/effects';
import {
    fieldSet,
    onChange,
    onReset,
    onSubmit,
    onSwitch,
    setState,
    signIn,
    signOut,
    signUp,
} from 'features/auth/model/events';
import {$form, $state} from 'features/auth/model/stores';
import {toMain} from 'features/navigation/model/events';

export const Gate = createGate();

guard({
    clock: Gate.open,
    source: $appState,
    filter: state => state === 'AUTHORIZED',
    target: toMain,
});

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
    from: [signInFx.doneData, signUpFx.doneData],
    to: [setAppState.prepend(() => 'AUTHORIZED'), toMain],
});

forward({
    from: [signInFx.doneData, signUpFx.doneData, onSwitch, Gate.open],
    to: onReset,
});

forward({
    from: signOut,
    to: signOutFx,
});

forward({
    from: signOutFx.doneData,
    to: setAppState.prepend(() => 'UNAUTHORIZED'),
});
