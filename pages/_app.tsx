import {useGate, useStore} from 'effector-react';
import 'features';
import {HeaderContainer} from 'features/common/app/containers/HeaderContainer';
import {Gate} from 'features/common/app/model';
import {$appState} from 'features/common/app/model/stores';
import {NotifyContainer} from 'features/common/notifications/containers/NotifyContainer';
import type {AppProps} from 'next/app';
import 'normalize.css/normalize.css';
import React from 'react';
import 'styles/index.scss';
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
                <meta content="viewport-fit=cover width=device-width" name="viewport" />
            </Head>

            {state === 'INITIAL_LOADING' ? (
                <PageLoader />
            ) : (
                <PageTemplate footer={<div>{'some footer'}</div>} header={<HeaderContainer />}>
                    <MainTemplate>
                        <Component {...pageProps} />
                    </MainTemplate>

                    <NotifyContainer />
                </PageTemplate>
            )}
        </>
    );
};
