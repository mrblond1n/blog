import {useStoreMap} from 'effector-react';
import {onToggle} from 'features/common/comments/reply/model/events';
import {$viewedRepliesIndex} from 'features/common/comments/reply/model/stores';
import {$commentsIndex} from 'features/common/comments/state/model/stores';

import React from 'react';
import {ButtonLink} from 'ui/atoms/ButtonLink';

export const ToggleButtonContainer = React.memo(({id}: {id: string}) => {
    const {replies} = useStoreMap({
        store: $commentsIndex,
        keys: [id],
        updateFilter: () => false,
        fn: (state, [id]) => state[id],
    });

    const isOpened = useStoreMap({
        store: $viewedRepliesIndex,
        keys: [id],
        defaultValue: false,
        fn: (state, [id]) => state[id],
    });

    const handleClick = React.useCallback(() => onToggle(id), [id]);
    const text = React.useMemo(() => (isOpened ? 'Hide' : 'View') + ` ${replies} replies`, [isOpened, replies]);

    if (!replies) return null;

    return <ButtonLink onClick={handleClick}>{text}</ButtonLink>;
});
