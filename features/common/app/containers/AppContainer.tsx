import {useGate, useStore} from 'effector-react';
import {HeaderContainer} from 'features/common/app/containers/HeaderContainer';
import {Gate} from 'features/common/app/model';
import {$appState} from 'features/common/app/model/stores';
import {NotifyContainer} from 'features/common/notifications/containers/NotifyContainer';
import React from 'react';
import {PageLoader} from 'ui/organisms/PageLoader';
import {MainTemplate} from 'ui/templates/MainTemplate';
import {PageTemplate} from 'ui/templates/PageTemplate';

export const AppContainer = React.memo(({children}) => {
    useGate(Gate);
    const state = useStore($appState);

    if (state === 'INITIAL_LOADING') return <PageLoader />;

    return (
        <PageTemplate footer={<div>{'some footer'}</div>} header={<HeaderContainer />}>
            <MainTemplate>{children}</MainTemplate>

            <NotifyContainer />
        </PageTemplate>
    );
});
