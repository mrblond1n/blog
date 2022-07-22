import {exampleItem, exampleItems, makeIndex} from '__mocks__/example';
import 'features';
import {addExampleItemFx, getExampleItemsFx, removeExampleItemFx} from 'features/example/models/effects';
import {clearExampleIndex} from 'features/example/models/events';
import {$exampleItemIdsList, $exampleItemIndex} from 'features/example/models/stores';

let currentHandler: any;

beforeEach(async () => {
    currentHandler = getExampleItemsFx.use.getCurrent();
    getExampleItemsFx.use(() => exampleItems);
    await getExampleItemsFx(null);
});

afterEach(() => {
    clearExampleIndex();
    getExampleItemsFx.use(currentHandler);
});

afterAll(() => {
    $exampleItemIndex.off(clearExampleIndex);
});

describe('$exampleItemIndex', () => {
    test('should $exampleItemIndex be equal makeIndex(exampleItems)', () => {
        expect($exampleItemIndex.getState()).toEqual(makeIndex(exampleItems));
    });

    test('should $exampleItemIndex be one more item', async () => {
        addExampleItemFx.use(() => exampleItem);
        await addExampleItemFx(exampleItem);

        expect($exampleItemIndex.getState()).toEqual(makeIndex([...exampleItems, exampleItem]));
    });

    test('should $exampleItemIndex be one less item', async () => {
        const item = {...exampleItem, id: '0'};

        removeExampleItemFx.use(() => item);
        await removeExampleItemFx(item);

        expect($exampleItemIndex.getState()).toEqual(makeIndex(exampleItems.filter(({id}) => id !== item.id)));
    });
});

describe('$exampleItemIdsList', () => {
    test(`should $exampleItemIdsList be ${exampleItems.length} length`, () => {
        expect($exampleItemIdsList.getState().length).toEqual(exampleItems.length);
    });

    test('should $exampleItemIdsList be one more item', async () => {
        addExampleItemFx.use(() => exampleItem);
        await addExampleItemFx(exampleItem);

        expect($exampleItemIdsList.getState().length).toEqual(exampleItems.length + 1);
    });

    test('should $exampleItemIdsList be one less item', async () => {
        const item = {...exampleItem, id: '0'};

        removeExampleItemFx.use(() => item);
        await removeExampleItemFx(item);

        expect($exampleItemIdsList.getState().length).toEqual(exampleItems.length - 1);
    });
});
