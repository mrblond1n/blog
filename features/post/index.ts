import {forward, guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {clearCommentsIndex, sendComment} from 'features/common/comments/state/model/events';
import {$inputsApi} from 'features/common/form/model/stores';
import {sendCommentFx} from 'features/post/comments/model/effects';
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

forward({
    from: Gate.close,
    to: clearCommentsIndex,
});

sample({
    clock: sendComment,
    source: guard({
        source: $id,
        filter: Boolean,
    }),
    filter: Gate.status,
    fn: (id, comment) => ({id, ...comment}),
    target: sendCommentFx,
});
