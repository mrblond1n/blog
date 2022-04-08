import {createEvent, Event, forward, guard, sample} from 'effector';

export const iterate = <V>(source: Event<V[]>) => {
    const target = createEvent<V>();
    const trigger = guard({
        source,
        filter: array => Boolean(array.length),
    });

    sample({
        clock: guard({
            source: trigger,
            filter: array => array.length > 1,
        }),
        source: trigger,
        fn: array => array.slice(1),
        target: trigger,
    });

    forward({
        from: trigger.map(([data]) => data),
        to: target,
    });

    return target;
};
