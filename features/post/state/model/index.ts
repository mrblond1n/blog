import {forward} from 'effector';
import {getPostFx} from 'features/post/state/model/effects';
import {setMode} from 'features/post/state/model/events';

forward({
    from: getPostFx.doneData,
    to: setMode.prepend(() => 'SUCCESS'),
});

forward({
    from: getPostFx.failData,
    to: setMode.prepend(() => 'FAILURE'),
});
