import {createStore} from 'effector';
import {addExampleItem, clearExampleIndex, removeExampleItem} from 'features/example/models/events';
import {TExampleItemDto} from 'types/dtos/example.dto';
import {createIndex} from 'utils/stack';

export const $exampleItemIndex = createStore(createIndex<TExampleItemDto>())
    .on(addExampleItem, (index, item) => index.set({key: item.id, value: item}))
    .on(removeExampleItem, (index, item) => index.remove({key: item.id}))
    .on(clearExampleIndex, index => index.clear())
    .map(value => value.getRaw());

export const $exampleItemIdsList = createStore<string[]>([])
    .on(addExampleItem, (state, item) => [...state, item.id])
    .on(removeExampleItem, (state, item) => state.filter(id => id !== item.id))
    .reset(clearExampleIndex);
