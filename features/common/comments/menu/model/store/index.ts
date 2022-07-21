import {createStore} from 'effector';
import {closeMenu, openMenu, resetMenus} from 'features/common/comments/menu/model/events';
import {createIndex} from 'utils/stack';

export const $openMenuIndex = createStore(createIndex<boolean>())
    .on(openMenu, (index, id) => index.set({key: id, value: true}))
    .on(closeMenu, (index, id) => index.set({key: id, value: false}))
    .on(resetMenus, index => index.clear())
    .map(value => value.getRaw());

const $openedMenuIdHistory = createStore<[string, string]>(['', ''])
    .on(openMenu, ([, current], state) => (state !== current ? [current, state] : void 0))
    .reset(resetMenus);

export const $currentMenuId = $openedMenuIdHistory.map(([, current]) => current);
export const $prevMenuId = $openedMenuIdHistory.map(([prev]) => prev);
