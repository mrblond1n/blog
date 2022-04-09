import {NavigationContainer} from 'features/navigation/containers/NavigationContainer';
import React from 'react';
import {MainTemplate} from 'ui/templates/MainTemplate';
import {PageTemplate} from 'ui/templates/PageTemplate';

export default () => {
    return (
        <PageTemplate footer={<div>{'some footer'}</div>} header={<NavigationContainer />}>
            <MainTemplate>{'example'}</MainTemplate>
        </PageTemplate>
    );
};
