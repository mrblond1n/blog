import {combine, createStore} from 'effector';
import {addReply} from 'features/common/comments/reply/model/events';
import {
    addComment,
    clearCommentsIndex,
    clearDiscussion,
    updateComment,
} from 'features/common/comments/state/model/events';
import {TCommentDto} from 'types/dtos/comments.dto';
import {createIndex} from 'utils/stack';

export const $commentsIndex = createStore(createIndex<TCommentDto>())
    .on([addComment, addReply, updateComment], (index, comment) => index.set({key: comment.id, value: comment}))
    .on(clearCommentsIndex, index => index.clear())
    .map(value => value.getRaw());

export const $discussionIdsIndex = createStore(createIndex<string[]>())
    .on(addComment, (index, comment) => {
        return comment.discussion_id
            ? index.updateOrCreate({
                  key: comment.discussion_id,
                  create: () => [comment.id],
                  update: prev => [...prev, comment.id],
              })
            : index.set({key: comment.id, value: []});
    })
    .on(clearCommentsIndex, index => index.clear())
    .on(clearDiscussion, (index, id) => index.update({key: id, fn: () => []}))
    .map(value => value.getRaw());

export const $discussionIdsList = combine($discussionIdsIndex, Object.keys);
