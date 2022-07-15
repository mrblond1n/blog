import {createStore, restore} from 'effector';
import {Gate} from 'features/post';
import {addComment, setMode} from 'features/post/comments/model/events';

export const $mode = restore(setMode, 'LOADING');

export const $idsList = createStore<string[]>([])
    .on(addComment, (state, {id}) => (state.includes(id) ? state : [...state, id]))
    .reset(Gate.close);
