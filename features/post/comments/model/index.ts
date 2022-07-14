import {forward, sample} from 'effector';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {$form} from 'features/common/form/model/stores';
import {getCommentsFx, sendCommentFx, sendReplyFx} from 'features/post/comments/model/effects';
import {
    addComment,
    changeAnswerText,
    clearAnswerStack,
    onAnswer,
    onChange,
    onKeyDown,
    openAnswerField,
    sendComment,
} from 'features/post/comments/model/events';
import {$currentAnswerText, $repliedComment} from 'features/post/comments/model/stores';
import {$id} from 'features/post/index';
import {getPostFx, updatePostFx} from 'features/post/state/model/effects';
import {iterate} from 'utils/effector/iterate';

sample({
    clock: getPostFx.doneData,
    source: $id,
    filter: Boolean,
    target: getCommentsFx,
});

sample({
    clock: sendComment,
    source: {form: $form, author: $displayName, uid: $uid},
    fn: ({form, ...data}, id) => ({...(form as {text: string}), id, ...data}),
    target: sendCommentFx,
});

forward({
    from: [sendReplyFx.doneData, sendCommentFx.doneData],
    to: addComment,
});

sample({
    clock: sendCommentFx.doneData,
    source: getPostFx.doneData,
    fn: post => ({...post, comments_count: (post.comments_count += 1)}),
    target: updatePostFx,
});

const newCommentEvent = iterate(getCommentsFx.doneData);

forward({
    from: newCommentEvent,
    to: addComment,
});

forward({
    from: onAnswer,
    to: clearAnswerStack,
});

sample({
    clock: clearAnswerStack,
    source: onAnswer,
    target: openAnswerField,
});

sample({
    clock: onChange,
    source: onAnswer,
    fn: (key, e) => ({key, value: e.target.value}),
    target: changeAnswerText,
});

sample({
    clock: onKeyDown,
    source: {
        text: $currentAnswerText,
        author: $displayName,
        uid: $uid,
        id: $id,
        comment: $repliedComment,
    },
    filter: ({id}, e) => Boolean(id && e.keyCode === 13),
    fn: ({id, comment, ...data}) => ({
        id: id || '',
        ...data,
        reply_id: comment?.id || '',
        parent_id: comment?.parent_id || comment?.id || '',
    }),
    target: sendReplyFx,
});
