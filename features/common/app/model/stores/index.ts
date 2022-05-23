import {combine, restore} from 'effector';
import {setAppState, setUser} from 'features/common/app/model/events';
import {signOutFx} from 'features/signin/model/effects';

export const $appState = restore(setAppState, 'INITIAL_LOADING');

const $user = restore(setUser, null).reset(signOutFx.doneData);

export const $displayName = combine($user, user => user?.displayName || 'Anon');
