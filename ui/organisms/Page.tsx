import {NavigationContainer} from 'features/navigation/containers/NavigationContainer';
import React from 'react';
import {MainTemplate} from 'ui/templates/MainTemplate';
import {PageTemplate} from 'ui/templates/PageTemplate';

export const Page = React.memo(({children}) => (
    <PageTemplate footer={<div>{'some footer'}</div>} header={<NavigationContainer />}>
        <MainTemplate>{children}</MainTemplate>
    </PageTemplate>
));
