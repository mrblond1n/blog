import {forward, sample, split} from 'effector';
import {createGate} from 'effector-react';
import {checkAuthFx, getUserFx} from 'features/common/app/model/effects';
import {setUser} from 'features/common/app/model/events';
import {setAppState} from 'features/common/app/model/stores';

export const Gate = createGate();

forward({
    from: Gate.open,
    to: checkAuthFx,
});

sample({
    clock: checkAuthFx.doneData,
    filter: Boolean,
    fn: data => data.uid,
    target: getUserFx,
});

forward({
    from: getUserFx.doneData,
    to: setUser,
});

split({
    source: checkAuthFx.doneData,
    match: {
        success: Boolean,
    },
    cases: {
        success: setAppState.authorize,
        __: setAppState.unAuthorize,
    },
});
