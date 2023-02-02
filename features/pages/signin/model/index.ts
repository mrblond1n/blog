import {forward, guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {getUserFx} from 'features/app/model/effects';
import {setUser} from 'features/app/model/events';
import {$appState, setAppState} from 'features/app/model/stores';
import {addField, addFields, onSubmit} from 'features/common/form/model/events';
import {$valueIndex} from 'features/common/form/model/stores';
import {signInFx, signOutFx} from 'features/pages/signin/model/effects';
import {signOut} from 'features/pages/signin/model/events';
import {fields} from 'features/pages/signin/utils/form';
import {toMain} from 'features/router/model/events';
import {iterate} from 'utils/effector/iterate';

export const Gate = createGate();

guard({
    clock: Gate.open,
    source: $appState,
    filter: state => state === 'AUTHORIZED',
    target: toMain,
});

sample({
    clock: Gate.open,
    fn: () => fields,
    target: addFields,
});

const newFieldEvent = iterate(addFields);

forward({
    from: newFieldEvent,
    to: addField,
});

sample({
    clock: onSubmit,
    source: $valueIndex,
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
