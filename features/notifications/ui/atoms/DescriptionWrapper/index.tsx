import style from 'features/notifications/ui/atoms/DescriptionWrapper/style.module.css'
import React from 'react'
import {Stack} from 'ui/atoms/Stack'

export const DescriptionWrapper = ({children}: {children: React.ReactNode}) => (
  <Stack className={style.container} direction="column">
    {children}
  </Stack>
)
