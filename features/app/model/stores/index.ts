import {combine, createApi, createStore, restore} from 'effector';
import {setUser} from 'features/app/model/events';
import {signOutFx} from 'features/pages/signin/model/effects';

type TAppState = 'INITIAL_LOADING' | 'AUTHORIZED' | 'UNAUTHORIZED';
export const $appState = createStore<TAppState>('INITIAL_LOADING');
export const setAppState = createApi($appState, {
    authorize: () => 'AUTHORIZED',
    unAuthorize: () => 'UNAUTHORIZED',
});

export const $user = restore(setUser, null).reset(signOutFx.doneData);

export const $displayName = combine($user, user => user?.displayName || 'Anon');
export const $uid = combine($user, user => user?.uid || '');
export const $isAdmin = combine($user, user => user?.admin || process.env.NODE_ENV === 'development');
