import {createStore} from 'effector';
import {addField, addFields, clearValues, onChange, resetForm} from 'features/common/form/model/events';
import {TField, TValue} from 'types';
import {createIndex, createStack} from 'utils/stack';

export const $valueIndex = createStore(createIndex<TValue>())
    .on(onChange, (index, payload) => index.set(payload))
    .on([clearValues, resetForm], index => index.clear())
    .map(value => value.getRaw());

export const $fieldIndex = createStore(createIndex<TField>())
    .on(addField, (index, payload) => index.set({key: payload.id, value: payload}))
    .on(resetForm, index => index.clear())
    .map(index => index.getRaw());

export const $fieldIdsStack = createStore(createStack<TField['id']>())
    .on(addFields, (stack, fields) => stack.update(() => fields.map(({id}) => id)))
    .on(resetForm, index => index.clear())
    .map(stack => stack.getRaw());
