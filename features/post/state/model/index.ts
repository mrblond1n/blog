import 'features/post/comments/models';
import {forward, sample} from 'effector';
import {getPostFx, updatePostCommentsFx, updatePostWatchesFx} from 'features/post/state/model/effects';
import {setMode, updatePostComments} from 'features/post/state/model/events';

forward({
    from: getPostFx.doneData,
    to: setMode.prepend(() => 'SUCCESS'),
});

forward({
    from: getPostFx.failData,
    to: setMode.prepend(() => 'FAILURE'),
});

sample({
    clock: getPostFx.doneData,
    fn: ({id, watches_count}) => ({id, watches_count: ++watches_count}),
    target: updatePostWatchesFx,
});

sample({
    clock: updatePostCommentsFx.done,
    fn: ({params: {comments_count}}) => ({comments_count}),
    target: updatePostComments,
});
