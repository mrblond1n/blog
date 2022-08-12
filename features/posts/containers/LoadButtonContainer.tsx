import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {onGetPosts} from 'features/posts/model/events';
import {$buttonIsDisabled, $buttonIsVisible} from 'features/posts/model/stores';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const LoadButtonContainer = React.memo(() => {
    const handleClick = React.useCallback(() => onGetPosts(), []);
    const isVisible = useStore($buttonIsVisible);
    const isDisabled = useStore($buttonIsDisabled);

    if (!isVisible) return null;

    return (
        <Button disabled={isDisabled} onClick={handleClick}>
            {intl(INTL.POSTS.LOAD_MORE)}
        </Button>
    );
});
