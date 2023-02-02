import './reply/model';
import './state/model';
import './liked/model';
import './menu/model';
import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {clearComments, sendComment} from 'features/common/comments/state/model/events';
import {addField, addFields, onSubmit, resetForm} from 'features/common/form/model/events';
import {$valueIndex} from 'features/common/form/model/stores';
import {fields} from 'features/pages/post/utils/form';
import {iterate} from 'utils/effector/iterate';

export const Gate = createGate();

sample({
    clock: Gate.open,
    fn: () => fields,
    target: addFields,
});

forward({
    from: Gate.close,
    to: [clearComments, resetForm],
});

const newFieldEvent = iterate(addFields);

forward({
    from: newFieldEvent,
    to: addField,
});

sample({
    clock: onSubmit,
    source: $valueIndex,
    filter: Gate.status,
    target: sendComment,
});
