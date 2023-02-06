import {INTL} from 'constants/intl'
import React from 'react'
import {Button} from 'ui/atoms/Button'
import {intl} from 'utils/intl'

export const SubmitButtonContainer = React.memo(() => {
  return <Button type="submit">{intl(INTL.POSTS.CREATE)}</Button>
})
