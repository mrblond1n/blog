import {forward, sample} from 'effector';
import {clearReplyValue} from 'features/common/comments/reply/model/events';
import {$replyId} from 'features/common/comments/reply/model/stores';
import {addComment} from 'features/common/comments/state/model/events';
import {$id} from 'features/post';
import {getCommentsFx, sendCommentFx, sendReplyFx} from 'features/post/comments/model/effects';
import {getPostFx, updatePostFx} from 'features/post/state/model/effects';
import {$post} from 'features/post/state/model/stores';
import {iterate} from 'utils/effector/iterate';

sample({
    clock: getPostFx.doneData,
    source: $id,
    filter: Boolean,
    target: getCommentsFx,
});

sample({
    clock: [sendCommentFx.doneData, sendReplyFx.doneData],
    source: $post,
    filter: Boolean,
    fn: post => ({...post, comments_count: ++post.comments_count}),
    target: updatePostFx,
});

const newCommentEvent = iterate(getCommentsFx.doneData);

forward({
    from: newCommentEvent,
    to: addComment,
});

forward({
    from: sendCommentFx.doneData,
    to: addComment,
});

sample({
    clock: sendReplyFx.doneData,
    source: $replyId,
    target: clearReplyValue,
});
