import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {onResetFx} from 'features/common/form/model/effects';
import {fieldSet, onChange, resetForm, selectFile} from 'features/common/form/model/events';
import React from 'react';

export const FormGate = createGate<{form?: React.RefObject<HTMLFormElement>}>();
export const $formElem = FormGate.state.map(x => x.form?.current);

sample({
    clock: FormGate.close,
    source: $formElem,
    filter: Boolean,
    target: resetForm,
});

forward({
    from: resetForm,
    to: onResetFx,
});

sample({
    clock: onChange,
    fn: ({target}) => ({
        key: target.name,
        value: target.type === 'file' ? `images/${target.files?.[0].name}` : target.value,
    }),
    target: fieldSet,
});

sample({
    clock: onChange,
    filter: ({target}) => target.type === 'file',
    fn: ({target}) => target.files?.[0],
    target: selectFile,
});
