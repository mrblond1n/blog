import {sample} from 'effector';
import {updateCommentLikes} from 'features/common/comments/liked/model/events';
import {$discussion} from 'features/common/comments/reply/model/stores';
import {updateComment} from 'features/common/comments/state/model/events';
import {$commentsIndex} from 'features/common/comments/state/model/stores';
import {$id} from 'features/post';
import {sendCommentFx, sendReplyFx} from 'features/post/comments/models/send/effects';
import {updateCommentLikesFx, updateCommentRepliesFx} from 'features/post/comments/models/update/effects';
import {updatePostCommentsFx} from 'features/post/state/model/effects';
import {$post} from 'features/post/state/model/stores';

sample({
    clock: [sendCommentFx.doneData, sendReplyFx.doneData],
    source: $post,
    filter: Boolean,
    fn: ({comments_count, id}) => ({id, comments_count: ++comments_count}),
    target: updatePostCommentsFx,
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
