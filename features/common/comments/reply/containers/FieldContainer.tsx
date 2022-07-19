import {TextField} from '@mui/material';
import {INTL} from 'constants/intl';
import {useStoreMap} from 'effector-react';
import {onChange, onKeyDown, onSend} from 'features/common/comments/reply/model/events';
import {$openedIndex, $valueIndex} from 'features/common/comments/reply/model/stores';

import React from 'react';
import {Button} from 'ui/atoms/Button';
import {Row} from 'ui/atoms/Row';
import {intl} from 'utils/intl';

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

    const handleReply = React.useCallback(() => onSend(), []);

    if (!isAnswered) return null;

    return (
        <Row direction="column" fullWidth margin>
            <TextField
                autoFocus
                fullWidth
                multiline
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                type="textarea"
                value={value}
            />
            <Row fullWidth justifyContent="flex-end" margin>
                <Button onClick={handleReply}>{intl(INTL.COMMENT.ACTION.SEND)}</Button>
            </Row>
        </Row>
    );
});
