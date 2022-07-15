import {useStoreMap} from 'effector-react';
import {onChange, onKeyDown} from 'features/common/comments/reply/model/events';
import {$openedIndex, $valueIndex} from 'features/common/comments/reply/model/stores';

import React from 'react';
import {Input} from 'ui/atoms/Input';

export const FieldContainer = React.memo(({id}: {id: string}) => {
    const isAnswered = useStoreMap({
        store: $openedIndex,
        keys: [id],
        defaultValue: false,
        fn: (state, [id]) => state[id],
    });

    const value = useStoreMap({
        store: $valueIndex,
        keys: [id],
        defaultValue: '',
        fn: (state, [id]) => state[id],
    });

    const handleKeyDown = React.useCallback(e => onKeyDown(e), []);
    const handleChange = React.useCallback(e => onChange(e), []);

    if (!isAnswered) return null;

    return (
        <Input autoFocus fullWidth onChange={handleChange} onKeyDown={handleKeyDown} type="textarea" value={value} />
    );
});
