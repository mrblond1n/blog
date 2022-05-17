import {INTL} from 'constants/intl';
import React from 'react';
import {ROUTES} from 'routes';
import {NavLink} from 'ui/atoms/NavLink';
import {intl} from 'utils/intl';

export const LinkButtonContainer = React.memo(() => {
    return <NavLink href={ROUTES.SIGN_IN}>{intl(INTL.AUTH.NOT.SIGN_IN)}</NavLink>;
});
