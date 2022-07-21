import {createStore, sample} from 'effector';
import {$uid} from 'features/common/app/model/stores';
import {closeMenu, openMenu, resetMenus} from 'features/common/comments/menu/model/events';
import {addReply} from 'features/common/comments/reply/model/events';
import {addComment} from 'features/common/comments/state/model/events';
import {createIndex} from 'utils/stack';

export const $accessToMenuIndex = createStore(createIndex<boolean>())
    .on(
        sample({
            clock: [addComment],
            source: $uid,
            filter: (uid, comment) => uid === comment.uid,
            fn: (_, {id}) => id,
        }),
        (index, id) => index.set({key: id, value: true})
    )
    .on(addReply, (index, {id}) => index.set({key: id, value: true}))
    .map(value => value.getRaw());

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
