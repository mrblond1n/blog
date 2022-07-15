import {sample} from 'effector';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {sendComment} from 'features/common/comments/state/model/events';
import {onSubmit} from 'features/common/form/model/events';
import {$form} from 'features/common/form/model/stores';

sample({
    clock: onSubmit,
    source: {form: $form, author: $displayName, uid: $uid},
    fn: ({form, ...data}) => ({...(form as {text: string}), ...data}),
    target: sendComment,
});
