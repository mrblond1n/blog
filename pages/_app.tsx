import {useGate} from 'effector-react';
import 'features';
import {Gate} from 'features/app/model';
import {NavigationContainer} from 'features/navigation/containers/NavigationContainer';
import type {AppProps} from 'next/app';
import 'normalize.css/normalize.css';
import React from 'react';
import 'styles/reset.css';
import {MainTemplate} from 'ui/templates/MainTemplate';
import {PageTemplate} from 'ui/templates/PageTemplate';

export default ({Component, pageProps}: AppProps) => {
    useGate(Gate);

    return (
        <PageTemplate footer={<div>{'some footer'}</div>} header={<NavigationContainer />}>
            <MainTemplate>
                <Component {...pageProps} />
            </MainTemplate>
        </PageTemplate>
    );
};
