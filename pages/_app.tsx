import 'features'
import {AppContainer} from 'features/app/containers/AppContainer'
import {HeadContainer} from 'features/app/containers/HeadContainer'
import {ThemeProviderContainer} from 'features/theme/container/ThemeProviderContainer'
import type {AppProps} from 'next/app'
import 'normalize.css/normalize.css'
import React from 'react'
import 'styles/index.scss'

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ThemeProviderContainer>
      <HeadContainer />
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ThemeProviderContainer>
  )
}

export default App
