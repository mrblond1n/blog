import {forward, guard} from 'effector';
import {createGate} from 'effector-react';
import {getPostFx} from 'features/post/model/effects';
import {setMode} from 'features/post/model/events';

export const Gate = createGate<{id?: string}>();
const $id = Gate.state.map(x => x?.id);

guard({
    clock: [
        Gate.open,
        guard({
            source: $id,
            filter: Boolean,
        }),
    ],
    source: $id,
    filter: Boolean,
    target: [getPostFx, setMode.prepend(() => 'LOADING')],
});

forward({
    from: getPostFx.doneData,
    to: setMode.prepend(() => 'SUCCESS'),
});

forward({
    from: getPostFx.failData,
    to: setMode.prepend(() => 'FAILURE'),
});
