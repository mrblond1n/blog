import {Wrapper} from 'features/common/app/ui/atoms/Wrapper';
import {NavigationContainer} from 'features/common/navigation/containers/NavigationContainer';
import {ThemeSwitcherButtonContainer} from 'features/common/theme/container/ThemeSwitcherButtonContainer';
import {LogoutButtonContainer} from 'features/signin/containers/LogoutButtonContainer';
import React from 'react';

export const HeaderContainer = React.memo(() => {
    return (
        <Wrapper>
            <NavigationContainer />
            <LogoutButtonContainer />
            <ThemeSwitcherButtonContainer />
        </Wrapper>
    );
});
