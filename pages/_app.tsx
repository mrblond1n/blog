import {useGate} from 'effector-react';
import 'features';
import {Gate} from 'features/app/model';
import type {AppProps} from 'next/app';
import 'normalize.css/normalize.css';

import React from 'react';
import 'styles/reset.css';

export default ({Component, pageProps}: AppProps) => {
    useGate(Gate);

    return <Component {...pageProps} />;
};
