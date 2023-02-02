import {useStore, useStoreMap} from 'effector-react';
import {$openedIndex} from 'features/common/comments/reply/model/stores';
import {onChange} from 'features/common/form/model/events';
import {$valueIndex} from 'features/common/form/model/stores';

import React from 'react';
import {TValue} from 'types';
import {Markdown} from 'ui/molecules/Markdown';
import {getStoreById} from 'utils/effector/getById';

const textareaProps = {
    required: true,
    placeholder: 'Write your reply',
};

export const FieldContainer = ({id}: {id: string}) => {
    const isOpened = useStoreMap({
        store: $openedIndex,
        keys: [id],
        defaultValue: false,
        fn: (state, [id]) => state[id],
    });

    const $value = React.useMemo(() => getStoreById($valueIndex, id), [id]);
    const value = (useStore($value) as string) || '';

    const handleChange = (value?: TValue<string>) => onChange({key: id, value});

    if (!isOpened) return null;

    return <Markdown onChange={handleChange} textareaProps={textareaProps} value={value} />;
};
