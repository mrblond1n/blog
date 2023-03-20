import {INTL} from 'constants/intl'
import Head from 'next/head'
import React from 'react'
import {intl} from 'utils/intl'

export const HeadContainer = React.memo(() => {
  return (
    <Head>
      <title>{intl(INTL.APP.NAME)}</title>
      <link href="/static/favicon.ico" rel="shortcut icon" />
      <meta content="viewport-fit=cover width=device-width" name="viewport" />
    </Head>
  )
})
