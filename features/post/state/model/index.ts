import {forward, sample} from 'effector';
import {getPostFx, updatePostFx} from 'features/post/state/model/effects';
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
    fn: post => ({...post, watches_count: (post.watches_count += 1)}),
    target: updatePostFx,
});
