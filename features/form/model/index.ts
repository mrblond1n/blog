import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {onResetFx} from 'features/form/model/effects';
import {fieldSet, onChange, onReset} from 'features/form/model/events';
import React from 'react';

export const FormGate = createGate<{form?: React.RefObject<HTMLFormElement>}>();
export const $formElem = FormGate.state.map(x => x.form?.current);

sample({
    clock: FormGate.close,
    source: $formElem,
    filter: Boolean,
    target: onReset,
});

forward({
    from: onReset,
    to: onResetFx,
});

sample({
    clock: onChange,
    fn: e => ({key: e.target.name, value: e.target.value}),
    target: fieldSet,
});
