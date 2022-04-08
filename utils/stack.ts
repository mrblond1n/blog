export type TStack<V> = {
    push(item: V): TStack<V>;
    pop(): TStack<V>;
    replaceTop(item: V): TStack<V>;
    isEmpty(): boolean;
    top(): V;
    getRaw(): V[];
};

export const createStack = <V>(items: V[] = []): TStack<V> => ({
    push: (item: V) => createStack([...items, item]),
    pop: () => createStack(items.slice(0, -1)),
    replaceTop: (item: V) => createStack([...items.slice(0, -1), item]),
    isEmpty: () => !items.length,
    top: () => items[items.length - 1],
    getRaw: (): V[] => items,
});

export type TIndex<T> = {
    set: (params: {key: string | number; value: T}) => TIndex<T>;
    update: (params: {key: string | number; fn: (value: T) => T}) => TIndex<T>;
    updateOrCreate: (params: {key: string | number; update: (value: T) => T; create: () => T}) => TIndex<T>;
    remove: (params: {key: string | number}) => TIndex<T>;
    clear: () => TIndex<T>;
    getRaw: () => {[key: string]: T};
};

export const createIndex = <T>(initValue: {[key: string]: T} = {}): TIndex<T> => {
    const result = {
        set,
        update,
        updateOrCreate,
        remove,
        getRaw,
        clear,
    };

    function set({key, value}: {key: string | number; value: T}) {
        return createIndex({...initValue, [key.toString()]: value});
    }

    function update({key, fn}: {key: string | number; fn: (value: T) => T}): TIndex<T> {
        const finalKey = key.toString();

        if (initValue[finalKey] === void 0) return result;
        const newValue = fn(initValue[finalKey]);

        if (initValue[finalKey] === newValue) return result;

        return createIndex({...initValue, [finalKey]: newValue});
    }

    function updateOrCreate({key, update, create}: {key: string | number; update: (value: T) => T; create: () => T}) {
        const finalKey = key.toString();

        if (initValue[finalKey] === void 0) {
            return createIndex({...initValue, [finalKey]: create()});
        }

        const newValue = update(initValue[finalKey]);

        if (initValue[finalKey] === newValue) return result;

        return createIndex({...initValue, [finalKey]: newValue});
    }

    function remove({key}: {key: string | number}) {
        const clone = {...initValue};

        delete clone[key.toString()];

        return createIndex(clone);
    }

    function getRaw() {
        return initValue;
    }

    function clear() {
        return createIndex<T>();
    }

    return result;
};
