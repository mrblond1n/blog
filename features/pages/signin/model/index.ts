import {forward, guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {getUserFx} from 'features/app/model/effects';
import {setUser} from 'features/app/model/events';
import {$appState, setAppState} from 'features/app/model/stores';
import {submitForm} from 'features/common/form/model/events';
import {$form, $inputsApi} from 'features/common/form/model/stores';
import {toMain} from 'features/router/model/events';
import {signInFx, signOutFx} from 'features/pages/signin/model/effects';
import {signOut} from 'features/pages/signin/model/events';

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
    clock: submitForm,
    source: $form,
    filter: Gate.status,
    target: signInFx,
});

forward({
    from: signInFx.doneData,
    to: [setAppState.authorize, toMain],
});

sample({
    clock: signInFx.doneData,
    fn: ({uid}) => uid,
    target: getUserFx,
});

forward({
    from: getUserFx.doneData,
    to: setUser,
});

forward({
    from: signOut,
    to: signOutFx,
});

forward({
    from: signOutFx.doneData,
    to: setAppState.unAuthorize,
});
