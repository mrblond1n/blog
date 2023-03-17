import {INTL} from 'constants/intl'
import {useStore} from 'effector-react'
import {$appState} from 'features/app/model/stores'
import {Icons} from 'icons'
import {useRouter} from 'next/router'
import React from 'react'
import {ROUTES} from 'routes'
import {IconButton} from 'ui/atoms/IconButton'
import {intl} from 'utils/intl'

export const LoginButtonContainer = React.memo(() => {
  const state = useStore($appState)
  const router = useRouter()

  const handleClick = () => router.push(ROUTES.SIGN_IN)

  if (state === 'AUTHORIZED') return null

  return (
    <IconButton aria-label={intl(INTL.SIGN_IN)} onClick={handleClick} title={intl(INTL.SIGN_IN)}>
      <Icons.Login />
    </IconButton>
  )
})
