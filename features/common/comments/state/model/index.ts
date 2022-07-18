import {sample} from 'effector';
import {sendComment} from 'features/common/comments/state/model/events';
import {onSubmit} from 'features/common/form/model/events';
import {$form} from 'features/common/form/model/stores';

sample({
    clock: onSubmit,
    source: $form,
    filter: ({text}) => !!text,
    fn: ({text}) => ({text}),
    target: sendComment,
});
