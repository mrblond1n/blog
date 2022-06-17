import {useGate, useStore} from 'effector-react';
import 'features';
import {HeaderContainer} from 'features/common/app/containers/HeaderContainer';
import {Gate} from 'features/common/app/model';
import {$appState} from 'features/common/app/model/stores';
import type {AppProps} from 'next/app';
import 'normalize.css/normalize.css';
import React from 'react';
import 'styles/reset.css';
import {PageLoader} from 'ui/organisms/PageLoader';
import {MainTemplate} from 'ui/templates/MainTemplate';
import {PageTemplate} from 'ui/templates/PageTemplate';
import Head from 'next/head';

export default ({Component, pageProps}: AppProps) => {
    useGate(Gate);
    const state = useStore($appState);

    return (
        <>
            <Head>
                <title>{'My App'}</title>
                <link href="/static/favicon.ico" rel="shortcut icon" />
            </Head>

            {state === 'INITIAL_LOADING' ? (
                <PageLoader />
            ) : (
                <PageTemplate footer={<div>{'some footer'}</div>} header={<HeaderContainer />}>
                    <MainTemplate>
                        <Component {...pageProps} />
                    </MainTemplate>
                </PageTemplate>
            )}
        </>
    );
};
