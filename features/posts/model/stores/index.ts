import {createStore, restore} from 'effector';
import {addPost, removePost, setMode} from 'features/posts/model/events';
import {Gate} from 'features/posts/model/index';
import {TPostDto} from 'types/dtos/posts.dto';
import {createIndex} from 'utils/stack';

export const $mode = restore(setMode, 'LOADING');

export const $postsIndex = createStore(createIndex<TPostDto>())
    .on(addPost, (index, post) => index.set({key: post.id, value: post}))
    .on(removePost, (index, id) => index.remove({key: id}))
    .on(Gate.close, index => index.clear())
    .map(value => value.getRaw());

export const $idsList = createStore<string[]>([])
    .on(addPost, (state, {id}) => [...state, id])
    .on(removePost, (state, id) => state.filter(item => item !== id))
    .reset(Gate.close);
