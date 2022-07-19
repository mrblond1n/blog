import {INTL} from 'constants/intl';
import {onReply} from 'features/common/comments/reply/model/events';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const ButtonContainer = React.memo(({id}: {id: string}) => {
    const handleClick = React.useCallback(() => onReply(id), [id]);

    return (
        <Button onClick={handleClick} size="small">
            {intl(INTL.COMMENT.ACTION.REPLY)}
        </Button>
    );
});
