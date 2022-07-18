import {forward, sample} from 'effector';
import {
    changeValue,
    clearOpenedIndex,
    onChange,
    onKeyDown,
    onOpen,
    onReply,
    onSend,
    sendReply,
} from 'features/common/comments/reply/model/events';
import {$discussionId, $replyId, $text} from 'features/common/comments/reply/model/stores';

forward({
    from: onReply,
    to: clearOpenedIndex,
});

sample({
    clock: clearOpenedIndex,
    source: onReply,
    target: onOpen,
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
