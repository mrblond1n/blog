import React from 'react'
import {Stack} from 'ui/atoms/Stack'
import style from './style.module.css'

export const CommentHeaderWrapper = React.memo(({children}) => (
  <Stack alignItems="center" className={style.container}>
    {children}
  </Stack>
))
