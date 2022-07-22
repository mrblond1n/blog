import {useStoreMap} from 'effector-react';
import {$exampleItemIndex} from 'features/example/models/stores';
import React from 'react';

export const ExampleItemContainer = React.memo(({id}: {id: string}) => {
    const {value} = useStoreMap({
        store: $exampleItemIndex,
        keys: [id],
        fn: (index, [id]) => index[id],
    });

    return <div data-testid={`example_item_${id}`}>{value}</div>;
});
