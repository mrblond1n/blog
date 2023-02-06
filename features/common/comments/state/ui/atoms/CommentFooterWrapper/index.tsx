import React from 'react'
import {Stack} from 'ui/atoms/Stack'
import style from './style.module.css'

export const CommentFooterWrapper = React.memo(({children}) => <Stack className={style.container}>{children}</Stack>)
