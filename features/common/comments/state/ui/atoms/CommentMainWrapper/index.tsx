import React from 'react'
import {Stack} from 'ui/atoms/Stack'
import style from './style.module.css'

export const CommentMainWrapper = React.memo(({children}) => (
  <Stack className={style.container} direction="column">
    {children}
  </Stack>
))
