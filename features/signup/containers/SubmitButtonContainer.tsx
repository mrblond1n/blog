import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {signUpFx} from 'features/signup/model/effects';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const SubmitButtonContainer = React.memo(() => {
    const disabled = useStore(signUpFx.pending);

    return (
        <Button disabled={disabled} type="submit">
            {intl(INTL.SIGN_UP.SUBMIT)}
        </Button>
    );
});
