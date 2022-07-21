import {forward, sample} from 'effector';
import {getReplies} from 'features/common/comments/reply/model/events';
import {addComment} from 'features/common/comments/state/model/events';
import {getCommentsFx} from 'features/post/comments/models/get/effects';
import {getComments} from 'features/post/comments/models/get/events';
import {$id} from 'features/post/index';
import {iterate} from 'utils/effector/iterate';

sample({
    clock: [getReplies, getComments],
    source: $id,
    filter: Boolean,
    fn: (id, discussionId) => (discussionId ? `${id}/comments/${discussionId}` : id),
    target: getCommentsFx,
});

const newCommentEvent = iterate(getCommentsFx.doneData);

forward({
    from: newCommentEvent,
    to: addComment,
});
