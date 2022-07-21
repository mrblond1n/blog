import {createStore} from 'effector';
import {
    addReply,
    changeValue,
    clearReplyValue,
    closeOpened,
    onOpen,
    onReply,
    onToggle,
    setDiscussionId,
} from 'features/common/comments/reply/model/events';
import {clearComments} from 'features/common/comments/state/model/events';
import {$commentsIndex} from 'features/common/comments/state/model/stores';
import {getById} from 'utils/effector/getById';
import {createIndex} from 'utils/stack';

export const $openedIndex = createStore(createIndex<boolean>())
    .on(onOpen, (index, id) => index.set({key: id, value: true}))
    .on(closeOpened, (index, id) => index.set({key: id, value: false}))
    .on(clearComments, index => index.clear())
    .map(value => value.getRaw());

export const $viewedRepliesIndex = createStore(createIndex<boolean>())
    .on(onToggle, (index, id) => {
        const state = index.getRaw();

        return index.set({key: id, value: !state[id]});
    })
    .on(clearComments, index => index.clear())
    .map(value => value.getRaw());

export const $valueIndex = createStore(createIndex<string>())
    .on(changeValue, (index, {key, value}) => index.set({key, value}))
    .on(clearReplyValue, (index, key) => index.set({key, value: ''}))
    .on(clearComments, index => index.clear())
    .map(value => value.getRaw());

export const $replyIdsIndex = createStore(createIndex<string[]>())
    .on(addReply, (index, {discussion_id, id}) => {
        if (discussion_id)
            return index.updateOrCreate({key: discussion_id, create: () => [id], update: prev => [...prev, id]});
    })
    .on(clearComments, index => index.clear())
    .map(value => value.getRaw());

const $replyIdHistory = createStore<[string, string]>(['', ''])
    .on(onReply, ([, current], state) => (state !== current ? [current, state] : void 0))
    .reset(clearComments);

export const $replyId = $replyIdHistory.map(([, current]) => current);
export const $prevReplyId = $replyIdHistory.map(([prev]) => prev);

const $discussionIdHistory = createStore<[string, string]>(['', '']).on(setDiscussionId, ([, current], state) =>
    state !== current ? [current, state] : void 0
);

export const $discussionId = $discussionIdHistory.map(([, current]) => current);

export const $discussion = getById($commentsIndex, $discussionId);
export const $text = getById($valueIndex, $replyId).map(value => value || '');
