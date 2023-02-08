import {Html, Head, Main, NextScript} from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/manifest.json" rel="manifest" />
        <link href="/icon.png" rel="apple-touch-icon"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
