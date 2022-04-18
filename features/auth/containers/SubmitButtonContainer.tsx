import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {$state} from 'features/auth/model/stores';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const SubmitButtonContainer = React.memo(() => {
    const state = useStore($state);

    return <Button type="submit">{intl(INTL.AUTH[state])}</Button>;
});
