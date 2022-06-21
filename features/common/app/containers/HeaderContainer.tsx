import {NavigationContainer} from 'features/common/navigation/containers/NavigationContainer';
import {ThemeSwitcherButtonContainer} from 'features/common/theme/container/ThemeSwitcherButtonContainer';
import {LogoutButtonContainer} from 'features/signin/containers/LogoutButtonContainer';
import React from 'react';
import {Row} from 'ui/atoms/Row';

export const HeaderContainer = React.memo(() => {
    return (
        <Row alignItems="center" justifyContent="center">
            <NavigationContainer />
            <LogoutButtonContainer />
            <ThemeSwitcherButtonContainer />
        </Row>
    );
});
