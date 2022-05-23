import {guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {onSubmit} from 'features/common/form/model/events';
import {$inputsApi} from 'features/common/form/model/stores';
import {sendComment} from 'features/post/comments/model/events';
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
    clock: onSubmit,
    source: guard({
        source: $id,
        filter: Boolean,
    }),
    filter: Gate.status,
    target: sendComment,
});
