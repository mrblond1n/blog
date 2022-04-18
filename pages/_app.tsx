import 'features';
import type {AppProps} from 'next/app';
import 'normalize.css/normalize.css';

import React from 'react';
import 'styles/reset.css';

export default ({Component, pageProps}: AppProps) => <Component {...pageProps} />;
