import {createStore, restore} from 'effector';
import {Gate} from 'features/post';
import {addComment, setMode} from 'features/post/comments/model/events';
import {TCommentDto} from 'types/dtos/comments.dto';
import {createIndex} from 'utils/stack';

export const $mode = restore(setMode, 'LOADING');

export const $commentsIndex = createStore(createIndex<TCommentDto>())
    .on(addComment, (index, comment) => index.set({key: comment.id, value: comment}))
    .on(Gate.close, index => index.clear())
    .map(value => value.getRaw());

export const $idsList = createStore<string[]>([])
    .on(addComment, (state, {id}) => (state.includes(id) ? state : [...state, id]))
    .reset(Gate.close);
