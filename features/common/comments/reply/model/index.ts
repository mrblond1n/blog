import {forward, sample, split} from 'effector';
import {
    closeOpened,
    getReplies,
    hideReplies,
    onOpen,
    onReply,
    onSend,
    onToggle,
    sendReply,
    setDiscussionId,
    showReplies,
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
import {resetListItem} from 'features/firebase/pagination/models/events';

sample({
    clock: onReply,
    source: $prevReplyId,
    filter: Boolean,
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
    clock: onSend,
    source: {
        discussion_id: $discussionId,
        reply_id: $replyId,
        text: $text,
    },
    filter: ({text}) => !!text,
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
        show: showReplies,
        __: hideReplies,
    },
});

sample({
    clock: hideReplies,
    source: onToggle,
    target: [clearDiscussion, resetListItem],
});

sample({
    clock: showReplies,
    source: onToggle,
    target: getReplies,
});
