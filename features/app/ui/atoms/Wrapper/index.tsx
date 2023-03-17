import {StackProps} from '@mui/material'
import style from 'features/app/ui/atoms/Wrapper/style.module.css'
import React from 'react'
import {Stack} from 'ui/atoms/Stack'

export const Wrapper = ({children, ...props}: StackProps) => (
  <Stack alignItems="center" className={style.container} justifyContent="flex-end" {...props}>
    {children}
  </Stack>
)
