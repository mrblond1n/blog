import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {signInFx} from 'features/signin/model/effects';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const SubmitButtonContainer = React.memo(() => {
    const disabled = useStore(signInFx.pending);

    return (
        <Button disabled={disabled} type="submit">
            {intl(INTL.SIGN_IN.SUBMIT)}
        </Button>
    );
});
