import {restore} from 'effector';
import {checkAuthFx} from 'features/app/model/effects';
import {setAppState} from 'features/app/model/events';

export const $user = restore(checkAuthFx.doneData, null);

export const $appState = restore(setAppState, 'INITIAL_LOADING');
