import {createStore, restore} from 'effector';
import {$uid} from 'features/common/app/model/stores';
import {removePostFx} from 'features/posts/model/effects';
import {addPost, removePost, setMode, updatePosts} from 'features/posts/model/events';
import {Gate} from 'features/posts/model/index';
import {TPostDto} from 'types/dtos/posts.dto';
import {createIndex} from 'utils/stack';

export const $mode = restore(setMode, 'LOADING');

export const $postsIndex = createStore(createIndex<TPostDto>())
    .on(addPost, (index, post) => index.set({key: post.id, value: post}))
    .on(removePostFx.doneData, (index, id) => index.remove({key: id}))
    .on(Gate.close, index => index.clear())
    .map(value => value.getRaw());

export const $disabledIndex = createStore(createIndex<boolean>())
    .on(addPost, (index, post) => index.set({key: post.id, value: false}))
    .on(removePost, (index, id) => index.set({key: id, value: true}))
    .on(removePostFx.doneData, (index, id) => index.remove({key: id}))
    .on(removePostFx.fail, (index, {params}) => index.set({key: params, value: false}))
    .on(Gate.close, index => index.clear())
    .map(value => value.getRaw());

export const $ownedIndex = createStore(createIndex<boolean>())
    .on(addPost, (index, post) => index.set({key: post.id, value: post.uid === $uid.getState()}))
    .on(removePostFx.doneData, (index, id) => index.remove({key: id}))
    .on(Gate.close, index => index.clear())
    .map(value => value.getRaw());

export const $idsList = createStore<string[]>([])
    .on(addPost, (state, {id}) => (state.includes(id) ? state : [...state, id]))
    .on(removePostFx.doneData, (state, id) => state.filter(item => item !== id))
    .reset(Gate.close, updatePosts);
