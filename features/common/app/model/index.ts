import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {checkAuthFx, getUserFx} from 'features/common/app/model/effects';
import {setAppState, setUser} from 'features/common/app/model/events';

export const Gate = createGate();

forward({
    from: Gate.open,
    to: checkAuthFx,
});

forward({
    from: checkAuthFx.doneData,
    to: setAppState.prepend(() => 'AUTHORIZED'),
});

sample({
    clock: checkAuthFx.doneData,
    fn: data => data.uid,
    target: getUserFx,
});

forward({
    from: getUserFx.doneData,
    to: setUser,
});

forward({
    from: checkAuthFx.failData,
    to: setAppState.prepend(() => 'UNAUTHORIZED'),
});
