import React from 'react'
import style from 'features/router/ui/NavigationLinkWrapper/style.module.css'

export const NavigationLinkWrapper = React.memo(({children}) => <li className={style.container}>{children}</li>)
