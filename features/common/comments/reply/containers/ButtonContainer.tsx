import {onReply} from 'features/common/comments/reply/model/events';
import React from 'react';
import {ButtonLink} from 'ui/atoms/ButtonLink';

export const ButtonContainer = React.memo(({id}: {id: string}) => {
    const handleClick = React.useCallback(() => onReply(id), [id]);

    return <ButtonLink onClick={handleClick}>{'answer'}</ButtonLink>;
});
