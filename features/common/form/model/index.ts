import {sample} from 'effector';
import {onSubmit, submitForm} from 'features/common/form/model/events';

sample({
    clock: submitForm,
    fn: e => e.preventDefault(),
    target: onSubmit,
});
