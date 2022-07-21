import './reply/model';
import './state/model';
import './liked/model';
import './menu/model';
import {forward} from 'effector';
import {createGate} from 'effector-react';
import {clearComments} from 'features/common/comments/state/model/events';

export const Gate = createGate();

forward({
    from: Gate.close,
    to: clearComments,
});
