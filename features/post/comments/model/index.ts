import {forward, sample} from 'effector';
import {updateCommentLikes} from 'features/common/comments/liked/model/events';
import {clearReplyValue, closeOpened} from 'features/common/comments/reply/model/events';
import {$discussion, $replyId} from 'features/common/comments/reply/model/stores';
import {addComment, updateComment} from 'features/common/comments/state/model/events';
import {$commentsIndex} from 'features/common/comments/state/model/stores';
import {$formElem} from 'features/common/form/model';
import {resetForm} from 'features/common/form/model/events';
import {$id} from 'features/post';
import {
    getCommentsFx,
    sendCommentFx,
    sendReplyFx,
    updateCommentLikesFx,
    updateCommentRepliesFx,
} from 'features/post/comments/model/effects';
import {getComments} from 'features/post/comments/model/events';
import {getPostFx, updatePostCommentsFx} from 'features/post/state/model/effects';
import {$post} from 'features/post/state/model/stores';
import {iterate} from 'utils/effector/iterate';

sample({
    clock: getPostFx.doneData,
    filter: ({comments_count}) => !!comments_count,
    target: getComments,
});

sample({
    clock: getComments,
    source: $id,
    filter: Boolean,
    target: getCommentsFx,
});

sample({
    clock: [sendCommentFx.doneData, sendReplyFx.doneData],
    source: $post,
    filter: Boolean,
    fn: ({comments_count, id}) => ({id, comments_count: ++comments_count}),
    target: updatePostCommentsFx,
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
    clock: sendCommentFx.doneData,
    source: $formElem,
    filter: Boolean,
    target: resetForm,
});

sample({
    clock: sendReplyFx.doneData,
    source: $replyId,
    target: [clearReplyValue, closeOpened],
});

sample({
    clock: sendReplyFx.doneData,
    source: {path: $id, discussion: $discussion},
    filter: data => !!data.path && !!data.discussion,
    fn: ({discussion, path}) => {
        if (!discussion || !path) throw new Error('fail');

        return {id: discussion.id, replies: ++discussion.replies, path};
    },
    target: updateCommentRepliesFx,
});

sample({
    clock: updateCommentRepliesFx.done,
    source: $discussion,
    filter: Boolean,
    fn: (comment, {params: {replies}}) => ({...comment, replies}),
    target: updateComment,
});

sample({
    clock: updateCommentLikes,
    source: {index: $commentsIndex, postId: $id},
    filter: ({postId}) => !!postId,
    fn: ({index, postId}, {key, ...data}) => {
        const {discussion_id: discussionId, id} = index[key];

        return {...data, id, path: discussionId ? `${postId}/comments/${discussionId}` : postId || ''};
    },
    target: updateCommentLikesFx,
});

sample({
    clock: updateCommentLikesFx.done,
    source: $commentsIndex,
    fn: (index, {params: {id, liked, disliked}}) => ({...index[id], liked, disliked}),
    target: updateComment,
});
