import style from 'features/app/ui/atoms/Wrapper/style.module.css'
import React from 'react'
import {Stack} from 'ui/atoms/Stack'

export const Wrapper = React.memo(({children}) => (
  <Stack alignItems="center" className={style.container} justifyContent="center">
    {children}
  </Stack>
))
