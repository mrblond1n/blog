import {guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {getPostFx} from 'features/post/state/model/effects';
import {setMode} from 'features/post/state/model/events';

export const Gate = createGate<{id?: string}>();
export const $id = Gate.state.map(x => x?.id);

sample({
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
