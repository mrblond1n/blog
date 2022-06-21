import Head from 'next/head';
import React from 'react';

export const HeadContainer = React.memo(() => {
    return (
        <Head>
            <title>{'My App'}</title>
            <link href="/static/favicon.ico" rel="shortcut icon" />
            <meta content="viewport-fit=cover width=device-width" name="viewport" />
        </Head>
    );
});
