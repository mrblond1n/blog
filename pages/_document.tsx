import {Html, Head, Main, NextScript} from 'next/document';
import React from 'react';

export default function Document() {
    const mode = 'light';

    return (
        <Html data-theme={mode}>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
