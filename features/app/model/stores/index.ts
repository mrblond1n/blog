import {restore} from 'effector';
import {checkAuthFx} from 'features/app/model/effects';

export const $user = restore(checkAuthFx.doneData, null);
