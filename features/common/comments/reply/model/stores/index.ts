import {createStore, restore} from 'effector';
import {
    changeValue,
    clearOpenedIndex,
    clearReplyValue,
    onOpen,
    onReply,
} from 'features/common/comments/reply/model/events';
import {$commentsIndex} from 'features/common/comments/state/model/stores';
import {getById} from 'utils/effector/getById';
import {createIndex} from 'utils/stack';

export const $openedIndex = createStore(createIndex<boolean>())
    .on(onOpen, (index, id) => index.set({key: id, value: true}))
    .on(clearOpenedIndex, index => index.clear())
    .map(value => value.getRaw());

export const $valueIndex = createStore(createIndex<string>())
    .on(changeValue, (index, {key, value}) => index.set({key, value}))
    .on(clearReplyValue, (index, key) => index.set({key, value: ''}))
    .map(value => value.getRaw());

export const $replyId = restore(onReply, '');
export const $discussionId = getById($commentsIndex, $replyId).map(data => data?.discussion_id || data?.id || '');
export const $comment = getById($commentsIndex, $discussionId);

export const $text = getById($valueIndex, $replyId).map(value => value || '');
