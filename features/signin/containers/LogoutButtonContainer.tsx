import {useStore} from 'effector-react';
import {$appState} from 'features/common/app/model/stores';
import {signOut} from 'features/signin/model/events';
import {Icons} from 'icons';
import React from 'react';
import {IconButton} from 'ui/atoms/IconButton';

export const LogoutButtonContainer = React.memo(() => {
    const state = useStore($appState);
    const handleClick = React.useCallback(() => signOut(), []);

    if (state === 'UNAUTHORIZED') return null;

    return (
        <IconButton onClick={handleClick}>
            <Icons.Logout />
        </IconButton>
    );
});
