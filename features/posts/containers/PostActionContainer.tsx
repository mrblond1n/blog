import {INTL} from 'constants/intl';
import {useStoreMap} from 'effector-react';
import {removePost} from 'features/posts/model/events';
import {$disabledIndex, $ownedIndex} from 'features/posts/model/stores';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const PostActionContainer = React.memo(({id}: {id: string}) => {
    const isOwned = useStoreMap({
        store: $ownedIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const disabled = useStoreMap({
        store: $disabledIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const handleClick = React.useCallback(() => removePost(id), [id]);

    return isOwned ? (
        <Button disabled={disabled} onClick={handleClick}>
            {intl(INTL.POSTS.REMOVE)}
        </Button>
    ) : null;
});
