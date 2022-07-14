import {useStoreMap} from 'effector-react';
import {onChange, onKeyDown} from 'features/post/comments/model/events';
import {$answerFieldIndex, $answerTextIndex} from 'features/post/comments/model/stores';

import React from 'react';
import {Input} from 'ui/atoms/Input';

export const AnswerFieldContainer = React.memo(({id}: {id: string}) => {
    const isAnswered = useStoreMap({
        store: $answerFieldIndex,
        keys: [id],
        defaultValue: false,
        fn: (state, [id]) => state[id],
    });

    const value = useStoreMap({
        store: $answerTextIndex,
        keys: [id],
        defaultValue: '',
        fn: (state, [id]) => state[id],
    });

    const handleKeyDown = React.useCallback(e => onKeyDown(e), []);
    const handleChange = React.useCallback(e => onChange(e), []);

    if (!isAnswered) return null;

    return <Input autoFocus onChange={handleChange} onKeyDown={handleKeyDown} value={value} />;
});
