import {forward, guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {setAppState, setUser} from 'features/common/app/model/events';
import {$appState} from 'features/common/app/model/stores';
import {onSubmit} from 'features/common/form/model/events';
import {$form, $inputsApi} from 'features/common/form/model/stores';
import {toMain} from 'features/common/navigation/model/events';
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
    from: signInFx.doneData,
    to: setUser,
});

forward({
    from: signOut,
    to: signOutFx,
});

forward({
    from: signOutFx.doneData,
    to: setAppState.prepend(() => 'UNAUTHORIZED'),
});
