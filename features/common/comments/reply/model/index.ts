import {forward, sample} from 'effector';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {
    changeValue,
    sendReply,
    onChange,
    clearOpenedIndex,
    onKeyDown,
    onOpen,
    onReply,
} from 'features/common/comments/reply/model/events';
import {$parent, $text} from 'features/common/comments/reply/model/stores';

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
    source: {
        author: $displayName,
        parent: $parent,
        text: $text,
        uid: $uid,
    },
    filter: ({text}, e) => e.keyCode === 13 && (e.metaKey || e.ctrlKey) && !!text,
    fn: ({parent, text, ...data}) => ({
        ...data,
        parent_id: parent?.parent_id || parent?.id || '',
        reply_id: parent?.id || '',
        text: text.trim(),
    }),
    target: sendReply,
});
