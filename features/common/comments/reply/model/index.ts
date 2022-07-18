import {forward, sample, split} from 'effector';
import {
    changeValue,
    closeOpened,
    getReplies,
    hideReplies,
    onChange,
    onKeyDown,
    onOpen,
    onReply,
    onSend,
    onToggle,
    sendReply,
    setDiscussionId,
} from 'features/common/comments/reply/model/events';
import {
    $discussionId,
    $prevReplyId,
    $replyId,
    $text,
    $viewedRepliesIndex,
} from 'features/common/comments/reply/model/stores';
import {clearDiscussion} from 'features/common/comments/state/model/events';
import {$commentsIndex} from 'features/common/comments/state/model/stores';

sample({
    clock: onReply,
    source: $prevReplyId,
    target: closeOpened,
});

sample({
    clock: [onReply, onToggle],
    source: $commentsIndex,
    filter: Boolean,
    fn: (state, id) => state[id].discussion_id || state[id].id,
    target: setDiscussionId,
});

sample({
    clock: clearDiscussion,
    source: $replyId,
    target: closeOpened,
});

forward({
    from: onReply,
    to: onOpen,
});

sample({
    clock: onChange,
    source: onReply,
    fn: (key, e) => ({key, value: e.target.value}),
    target: changeValue,
});

sample({
    clock: onKeyDown,
    filter: e => e.keyCode === 13 && (e.metaKey || e.ctrlKey),
    target: onSend,
});

sample({
    clock: onSend,
    source: {
        discussion_id: $discussionId,
        reply_id: $replyId,
        text: $text,
    },
    filter: ({text}) => !!text,
    fn: ({text, ...comment}) => ({...comment, text: text.trim()}),
    target: sendReply,
});

split({
    source: sample({
        clock: onToggle,
        source: $viewedRepliesIndex,
        fn: (state, id) => state[id],
    }),
    match: {
        show: Boolean,
    },
    cases: {
        show: getReplies,
        __: hideReplies,
    },
});

sample({
    clock: hideReplies,
    source: onToggle,
    target: clearDiscussion,
});
