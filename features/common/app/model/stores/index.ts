import {restore} from 'effector';
import {checkAuthFx} from 'features/common/app/model/effects';
import {setAppState} from 'features/common/app/model/events';

export const $user = restore(checkAuthFx.doneData, null);

export const $appState = restore(setAppState, 'INITIAL_LOADING');
