import {createStore} from 'effector';
import {setDislike, setLike} from 'features/common/comments/liked/model/events';
import {addReply} from 'features/common/comments/reply/model/events';
import {addComment, clearComments} from 'features/common/comments/state/model/events';
import {createIndex} from 'utils/stack';

export const $likedUsersIndex = createStore(createIndex<string[]>())
    .on([addComment, addReply], (index, comment) => index.set({key: comment.id, value: comment.liked}))
    .on(setLike, (index, {key, value}) => {
        return index.update({
            key: key,
            fn: prev => (prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]),
        });
    })
    .on(setDislike, (index, {key, value}) => index.update({key: key, fn: prev => prev.filter(id => id !== value)}))
    .on(clearComments, index => index.clear())
    .map(value => value.getRaw());

export const $dislikedUsersIndex = createStore(createIndex<string[]>())
    .on([addComment, addReply], (index, {id, disliked}) => index.set({key: id, value: disliked}))
    .on(setDislike, (index, {key, value}) => {
        return index.update({
            key,
            fn: prev => (prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]),
        });
    })
    .on(setLike, (index, {key, value}) => index.update({key, fn: prev => prev.filter(id => id !== value)}))
    .on(clearComments, index => index.clear())
    .map(value => value.getRaw());
