import {forward} from 'effector';
import {createGate} from 'effector-react';
import {checkAuthFx} from 'features/app/model/effects';

export const Gate = createGate();

forward({
    from: Gate.open,
    to: checkAuthFx,
});
