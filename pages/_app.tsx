import {useGate, useStore} from 'effector-react';
import 'features';
import {HeaderContainer} from 'features/app/containers/HeaderContainer';
import {Gate} from 'features/app/model';
import {$appState} from 'features/app/model/stores';
import type {AppProps} from 'next/app';
import 'normalize.css/normalize.css';
import React from 'react';
import 'styles/reset.css';
import {MainTemplate} from 'ui/templates/MainTemplate';
import {PageTemplate} from 'ui/templates/PageTemplate';

export default ({Component, pageProps}: AppProps) => {
    useGate(Gate);
    const state = useStore($appState);

    if (state === 'INITIAL_LOADING') return <div>{'Loading...'}</div>;

    return (
        <PageTemplate footer={<div>{'some footer'}</div>} header={<HeaderContainer />}>
            <MainTemplate>
                <Component {...pageProps} />
            </MainTemplate>
        </PageTemplate>
    );
};
