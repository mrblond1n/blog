import {createStore} from 'effector';
import {addReply} from 'features/common/comments/reply/model/events';
import {
    addComment,
    clearComments,
    clearDiscussion,
    removeComment,
    updateComment,
} from 'features/common/comments/state/model/events';
import {TCommentDto} from 'types/dtos/comments.dto';
import {createIndex} from 'utils/stack';

export const $commentsIndex = createStore(createIndex<TCommentDto>())
    .on([addComment, addReply, updateComment], (index, comment) => index.set({key: comment.id, value: comment}))
    .on(removeComment, (index, {id}) => index.remove({key: id}))
    .on(clearComments, index => index.clear())
    .map(value => value.getRaw());

export const $discussionIdsIndex = createStore(createIndex<string[]>())
    .on(addComment, (index, {discussion_id, id}) => {
        return discussion_id
            ? index.updateOrCreate({key: discussion_id, create: () => [id], update: prev => [...prev, id]})
            : index.updateOrCreate({key: id, create: () => [], update: prev => prev});
    })
    .on(removeComment, (index, {discussion_id, id}) => {
        return discussion_id
            ? index.update({key: discussion_id, fn: prev => prev.filter(item => item !== id)})
            : index.remove({key: id});
    })
    .on(clearComments, index => index.clear())
    .on(clearDiscussion, (index, id) => index.update({key: id, fn: () => []}))
    .map(value => value.getRaw());

export const $discussionIdsList = createStore<string[]>([])
    .on(addComment, (state, {id, discussion_id}) => (discussion_id ? state : [id, ...state]))
    .on(removeComment, (state, {id, discussion_id}) => (discussion_id ? state : state.filter(item => item !== id)))
    .reset(clearComments);
