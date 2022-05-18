import {forward, guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {setAppState} from 'features/app/model/events';
import {$appState} from 'features/app/model/stores';
import {onSubmit} from 'features/form/model/events';
import {$form, $inputsApi} from 'features/form/model/stores';
import {toMain} from 'features/navigation/model/events';
import {signInFx, signOutFx} from 'features/signin/model/effects';
import {signOut} from 'features/signin/model/events';

export const Gate = createGate();

guard({
    clock: Gate.open,
    source: $appState,
    filter: state => state === 'AUTHORIZED',
    target: toMain,
});

forward({
    from: Gate.open,
    to: $inputsApi.setSignInInputs,
});

sample({
    clock: onSubmit,
    source: $form,
    filter: Gate.status,
    target: signInFx,
});

forward({
    from: signInFx.doneData,
    to: [setAppState.prepend(() => 'AUTHORIZED'), toMain],
});

forward({
    from: signOut,
    to: signOutFx,
});

forward({
    from: signOutFx.doneData,
    to: setAppState.prepend(() => 'UNAUTHORIZED'),
});
