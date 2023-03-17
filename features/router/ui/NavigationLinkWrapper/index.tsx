import React from 'react'
import style from 'features/router/ui/NavigationLinkWrapper/style.module.css'

export const NavigationLinkWrapper = ({children}: {children: React.ReactNode}) => (
  <li className={style.container}>{children}</li>
)
