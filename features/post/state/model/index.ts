import 'features/post/comments/model';
import {forward, sample} from 'effector';
import {getPostFx, updatePostWatchesFx} from 'features/post/state/model/effects';
import {setMode} from 'features/post/state/model/events';

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
