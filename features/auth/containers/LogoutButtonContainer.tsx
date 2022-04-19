import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {$appState} from 'features/app/model/stores';
import {signOut} from 'features/auth/model/events';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const LogoutButtonContainer = React.memo(() => {
    const state = useStore($appState);
    const handleClick = React.useCallback(() => signOut(), []);

    if (state === 'UNAUTHORIZED') return null;

    return <Button onClick={handleClick}>{intl(INTL.AUTH.SIGN_OUT)}</Button>;
});
