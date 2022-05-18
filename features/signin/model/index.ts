import {guard, sample, split} from 'effector';
import {createGate} from 'effector-react';
import {forward} from 'effector/effector.mjs';
import {setAppState} from 'features/app/model/events';
import {$appState} from 'features/app/model/stores';
import {signInFx, signOutFx, signUpFx} from 'features/signin/model/effects';
import {onSwitch, setState, signIn, signOut, signUp} from 'features/signin/model/events';
import {$state} from 'features/signin/model/stores';
import {$formElem} from 'features/form/model';
import {onReset, onSubmit} from 'features/form/model/events';
import {$form, $inputsApi, changeButtonText} from 'features/form/model/stores';
import {toMain} from 'features/navigation/model/events';

export const Gate = createGate();

guard({
    clock: Gate.open,
    source: $appState,
    filter: state => state === 'AUTHORIZED',
    target: toMain,
});

forward({
    from: Gate.open,
    to: [changeButtonText.toSignIn, $inputsApi.setSignInInputs],
});

split({
    source: sample({
        clock: onSubmit,
        source: $state,
        filter: Gate.status,
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

split({
    source: setState,
    match: {
        isSignInState: state => state === 'SIGN_IN',
    },
    cases: {
        isSignInState: $inputsApi.setSignInInputs,
        __: $inputsApi.setSignUpInputs,
    },
});

forward({
    from: [signInFx.doneData, signUpFx.doneData],
    to: [setAppState.prepend(() => 'AUTHORIZED'), toMain],
});

sample({
    clock: Gate.open,
    source: $formElem,
    filter: Boolean,
    target: onReset,
});

forward({
    from: signOut,
    to: signOutFx,
});

forward({
    from: signOutFx.doneData,
    to: setAppState.prepend(() => 'UNAUTHORIZED'),
});
