import {forward, sample} from 'effector';
import {getReplies} from 'features/common/comments/reply/model/events';
import {getCommentsCollection} from 'features/common/comments/state/model/events';
import {getCommentsFx} from 'features/post/comments/models/get/effects';
import {getComments} from 'features/post/comments/models/get/events';
import {$id} from 'features/post/index';

sample({
    clock: [getReplies, getComments],
    source: $id,
    filter: Boolean,
    fn: (id, discussionId) => (discussionId ? `${id}/comments/${discussionId}` : id),
    target: getCommentsFx,
});

forward({
    from: getCommentsFx.doneData,
    to: getCommentsCollection,
});
