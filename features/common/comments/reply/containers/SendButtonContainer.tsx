import {INTL} from 'constants/intl';
import {useStoreMap} from 'effector-react';
import {onSend} from 'features/common/comments/reply/model/events';
import {$openedIndex} from 'features/common/comments/reply/model/stores';

import React from 'react';
import {Button} from 'ui/atoms/Button';
import {Row} from 'ui/atoms/Row';
import {intl} from 'utils/intl';

export const SendButtonContainer = React.memo(({id}: {id: string}) => {
    const isOpened = useStoreMap({
        store: $openedIndex,
        keys: [id],
        defaultValue: false,
        fn: (state, [id]) => state[id],
    });
    const handleClick = React.useCallback(() => onSend(), []);

    if (!isOpened) return null;

    return (
        <Row fullWidth justifyContent="flex-end" margin>
            <Button onClick={handleClick}>{intl(INTL.COMMENT.ACTION.SEND)}</Button>
        </Row>
    );
});
