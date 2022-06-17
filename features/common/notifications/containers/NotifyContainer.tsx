import {useStore} from 'effector-react';
import {setNotifyState} from 'features/common/notifications/model/events';
import {$notify, $notifyMode, $notifyState} from 'features/common/notifications/model/stores';
import {DescriptionWrapper} from 'features/common/notifications/ui/atoms/DescriptionWrapper';
import {NotifyWrapper} from 'features/common/notifications/ui/atoms/NotifyWrapper';
import SnackbarWrapper from 'features/common/notifications/ui/atoms/Snackbar';
import React from 'react';
import {useMountTransition} from 'utils/hooks/useMountedTransition';

export const NotifyContainer: React.FC = React.memo(() => {
    const notify = useStore($notify);
    const mode = useStore($notifyMode);
    const state = useStore($notifyState);

    const handleClose = React.useCallback(() => setNotifyState('CLOSED'), []);
    const isActive = React.useMemo(() => state === 'OPENED', [state]);

    const hasTransitionedIn = useMountTransition(isActive, 500);

    return hasTransitionedIn ? (
        <NotifyWrapper delay={3000} isActive={isActive} onOutsideClick={handleClose}>
            <SnackbarWrapper colorScheme={mode}>
                <DescriptionWrapper>
                    <p>{notify.title}</p>
                    <p>{notify.text}</p>
                </DescriptionWrapper>
            </SnackbarWrapper>
        </NotifyWrapper>
    ) : null;
});
