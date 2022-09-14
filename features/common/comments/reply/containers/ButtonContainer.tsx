import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {$appState} from 'features/app/model/stores';
import {onReply} from 'features/common/comments/reply/model/events';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const ButtonContainer = React.memo(({id}: {id: string}) => {
    const state = useStore($appState);
    const handleClick = React.useCallback(() => onReply(id), [id]);

    if (state !== 'AUTHORIZED') return null;

    return (
        <Button onClick={handleClick} size="small">
            {intl(INTL.COMMENT.ACTION.REPLY)}
        </Button>
    );
});
