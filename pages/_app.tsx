import 'normalize.css/normalize.css';
import 'styles/reset.css';

import React from 'react';
import type {AppProps} from 'next/app';

export default ({Component, pageProps}: AppProps) => <Component {...pageProps} />;
