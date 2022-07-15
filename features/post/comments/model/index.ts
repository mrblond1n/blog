import {forward, sample} from 'effector';
import {clearReplyValue, sendReply} from 'features/common/comments/reply/model/events';
import {addComment} from 'features/common/comments/state/model/events';
import {getCommentsFx, sendCommentFx, sendReplyFx} from 'features/post/comments/model/effects';
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
    from: [sendReplyFx.doneData, sendCommentFx.doneData],
    to: addComment,
});

sample({
    clock: sendReply,
    source: $id,
    filter: Boolean,
    fn: (id, comment) => ({...comment, id}),
    target: sendReplyFx,
});

sample({
    clock: sendReplyFx.doneData,
    fn: ({reply_id}) => reply_id || '',
    target: clearReplyValue,
});
