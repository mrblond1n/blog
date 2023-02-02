import {combine, Store} from 'effector';

export function getById<T>($index: Store<{[id: string]: T}>, $id: Store<string>): Store<T | null> {
    return combine($index, $id, (index, id) =>
        // eslint-disable-next-line no-nested-ternary
        id === null ? null : index[id] === void 0 ? null : index[id]
    );
}

export function getStoreById<T>($index: Store<{[id: string]: T}>, id: string): Store<T | null> {
    return combine($index, index =>
        // eslint-disable-next-line no-nested-ternary
        id === null ? null : index[id] === void 0 ? null : index[id]
    );
}
