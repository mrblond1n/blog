import {INTL} from 'constants/intl';
import {useStoreMap} from 'effector-react';
import {onToggle} from 'features/common/comments/reply/model/events';
import {$viewedRepliesIndex} from 'features/common/comments/reply/model/stores';
import {$commentsIndex} from 'features/common/comments/state/model/stores';

import React from 'react';
import {ButtonLink} from 'ui/atoms/ButtonLink';
import {Stack} from 'ui/atoms/Stack';
import {intl} from 'utils/intl';

export const ToggleButtonContainer = React.memo(({id}: {id: string}) => {
    const {replies} = useStoreMap({
        store: $commentsIndex,
        keys: [id],
        fn: (state, [id]) => state[id],
    });

    const isOpened = useStoreMap({
        store: $viewedRepliesIndex,
        keys: [id],
        defaultValue: false,
        fn: (state, [id]) => state[id],
    });

    const handleClick = React.useCallback(() => onToggle(id), [id]);
    const text = React.useMemo(() => intl(INTL.COMMENT.ACTION[isOpened ? 'HIDE_REPLIES' : 'SHOW_REPLIES']), [isOpened]);

    if (!replies) return null;

    return (
        <Stack>
            <ButtonLink onClick={handleClick}>{text}</ButtonLink>
        </Stack>
    );
});
