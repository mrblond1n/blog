import {forward} from 'effector';
import {createGate} from 'effector-react';
import {addExampleItemFx, getExampleItemsFx, removeExampleItemFx} from 'features/example/models/effects';
import {addExampleItem, clearExampleIndex, getExampleItems, removeExampleItem} from 'features/example/models/events';
import {iterate} from 'utils/effector/iterate';

export const ExampleGate = createGate();

forward({
    from: ExampleGate.open,
    to: getExampleItems,
});

forward({
    from: getExampleItems,
    to: getExampleItemsFx,
});

const newExampleItemEvent = iterate(getExampleItemsFx.doneData);

forward({
    from: newExampleItemEvent,
    to: addExampleItem,
});

forward({
    from: ExampleGate.close,
    to: clearExampleIndex,
});

forward({
    from: addExampleItemFx.doneData,
    to: addExampleItem,
});

forward({
    from: removeExampleItemFx.doneData,
    to: removeExampleItem,
});
