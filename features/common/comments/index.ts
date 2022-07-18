import './reply/model';
import './state/model';
import {forward} from 'effector';
import {createGate} from 'effector-react';
import {closeComments} from 'features/common/comments/state/model/events';

export const Gate = createGate();

forward({
    from: Gate.close,
    to: closeComments,
});
