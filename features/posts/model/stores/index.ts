import {createStore, restore} from 'effector';
import {$uid} from 'features/common/app/model/stores';
import {
    addNewPost,
    addPost,
    onRemove,
    removePost,
    resetDisable,
    clearIndexes,
    setMode,
} from 'features/posts/model/events';
import {TPostDto} from 'types/dtos/posts.dto';
import {createIndex} from 'utils/stack';

export const $mode = restore(setMode, 'LOADING');

export const $postsIndex = createStore(createIndex<TPostDto>())
    .on(addPost, (index, post) => index.set({key: post.id, value: post}))
    .on(addNewPost, (index, post) => index.set({key: post.id, value: post}))
    .on(removePost, (index, id) => index.remove({key: id}))
    .on(clearIndexes, index => index.clear())
    .map(value => value.getRaw());

export const $disabledIndex = createStore(createIndex<boolean>())
    .on(addPost, (index, post) => index.set({key: post.id, value: false}))
    .on(onRemove, (index, id) => index.set({key: id, value: true}))
    .on(removePost, (index, id) => index.remove({key: id}))
    .on(resetDisable, (index, id) => index.set({key: id, value: false}))
    .on(clearIndexes, index => index.clear())
    .map(value => value.getRaw());

export const $ownedIndex = createStore(createIndex<boolean>())
    .on(addPost, (index, post) => index.set({key: post.id, value: post.uid === $uid.getState()}))
    .on(removePost, (index, id) => index.remove({key: id}))
    .on(clearIndexes, index => index.clear())
    .map(value => value.getRaw());

export const $idsList = createStore<string[]>([])
    .on([addPost, addNewPost], (state, {id}) => (state.includes(id) ? state : [id, ...state]))
    .on(removePost, (state, id) => state.filter(item => item !== id))
    .reset(clearIndexes);
