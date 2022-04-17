import {createEvent, Event, forward, restore, sample} from 'effector';

export const iterate = <V>(source: Event<V[]>) => {
    const target = createEvent<V>();
    const $trigger = restore(
        sample({
            source,
            filter: array => Boolean(array.length),
        }),
        []
    );

    sample({
        clock: sample({
            source: $trigger,
            filter: array => array.length > 1,
        }),
        source: $trigger,
        fn: array => array.slice(1),
        target: $trigger,
    });

    forward({
        from: $trigger.map(([data]) => data),
        to: target,
    });

    return target;
};
