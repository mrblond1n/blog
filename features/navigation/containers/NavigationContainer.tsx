import {INTL} from 'constants/intl';
import {useList} from 'effector-react';
import {$links} from 'features/navigation/model/stores';
import {NavigationLinkWrapper} from 'features/navigation/ui/NavigationLinkWrapper';
import {NavigationListWrapper} from 'features/navigation/ui/NavigationListWrapper';
import React from 'react';
import {NavLink} from 'ui/atoms/NavLink';
import {intl} from 'utils/intl';

export const NavigationContainer = React.memo(() => (
    <NavigationListWrapper>
        {useList($links, path => (
            <NavigationLinkWrapper>
                <NavLink href={path}>{intl(INTL.HOME.PATH[path])}</NavLink>
            </NavigationLinkWrapper>
        ))}
    </NavigationListWrapper>
));
