import 'features';
import {AppContainer} from 'features/common/app/containers/AppContainer';
import {HeadContainer} from 'features/common/app/containers/HeadContainer';
import {ThemeProviderContainer} from 'features/common/theme/container/ThemeProviderContainer';
import type {AppProps} from 'next/app';
import 'normalize.css/normalize.css';
import React from 'react';
import 'styles/index.scss';

const App = ({Component, pageProps}: AppProps) => {
    return (
        <ThemeProviderContainer>
            <HeadContainer />
            <AppContainer>
                <Component {...pageProps} />
            </AppContainer>
        </ThemeProviderContainer>
    );
};

export default App;
