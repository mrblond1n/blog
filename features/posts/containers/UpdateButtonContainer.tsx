import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {getPostsFx} from 'features/posts/model/effects';
import {updatePosts} from 'features/posts/model/events';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const UpdateButtonContainer = React.memo(() => {
    const handleClick = React.useCallback(() => updatePosts(), []);
    const disabled = useStore(getPostsFx.pending);

    return (
        <Button disabled={disabled} onClick={handleClick}>
            {intl(INTL.POSTS.UPDATE)}
        </Button>
    );
});
