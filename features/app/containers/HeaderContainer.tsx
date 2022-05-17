import {LogoutButtonContainer} from 'features/signin/containers/LogoutButtonContainer';
import {NavigationContainer} from 'features/navigation/containers/NavigationContainer';
import React from 'react';
import {Row} from 'ui/atoms/Row';

export const HeaderContainer = React.memo(() => {
    return (
        <Row alignItems="center" justifyContent="center">
            <NavigationContainer />
            <LogoutButtonContainer />
        </Row>
    );
});
