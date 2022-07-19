import {createStore} from 'effector';
import {removeDislike, removeLike, setDislike, setLike} from 'features/common/comments/liked/model/events';
import {addReply} from 'features/common/comments/reply/model/events';
import {addComment, updateComment} from 'features/common/comments/state/model/events';
import {createIndex} from 'utils/stack';

export const $likedUsersIndex = createStore(createIndex<string[]>())
    .on([addComment, updateComment, addReply], (index, comment) => index.set({key: comment.id, value: comment.liked}))
    .on(setLike, (index, {key, value}) => index.update({key: key, fn: prev => [...prev, value]}))
    .on([setDislike, removeLike], (index, {key, value}) =>
        index.update({key: key, fn: prev => prev.filter(id => id !== value)})
    )
    .map(value => value.getRaw());

export const $dislikedUsersIndex = createStore(createIndex<string[]>())
    .on([addComment, updateComment, addReply], (index, comment) =>
        index.set({key: comment.id, value: comment.disliked})
    )
    .on(setDislike, (index, {key, value}) => index.update({key: key, fn: prev => [...prev, value]}))
    .on([setLike, removeDislike], (index, {key, value}) =>
        index.update({key: key, fn: prev => prev.filter(id => id !== value)})
    )
    .map(value => value.getRaw());
