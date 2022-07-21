import {guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {$inputsApi} from 'features/common/form/model/stores';
import {getComments} from 'features/post/comments/model/events';
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
    target: [getPostFx, setMode.prepend(() => 'LOADING'), $inputsApi.setAddCommentInputs],
});

sample({
    clock: getPostFx.doneData,
    filter: ({comments_count}) => !!comments_count,
    fn: () => void 0,
    target: getComments,
});
