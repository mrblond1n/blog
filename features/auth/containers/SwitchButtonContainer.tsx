import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {onSwitch} from 'features/auth/model/events';
import {$state} from 'features/auth/model/stores';
import {SwitchButtonWrapper} from 'features/auth/ui/atoms/SwitchButtonWrapper';
import React from 'react';
import {intl} from 'utils/intl';

export const SwitchButtonContainer = React.memo(() => {
    const state = useStore($state);
    const handleSwitch = React.useCallback(() => onSwitch(), []);

    return (
        <SwitchButtonWrapper>
            <button onClick={handleSwitch} type="button">
                {intl(INTL.AUTH.NOT[state])}
            </button>
        </SwitchButtonWrapper>
    );
});
