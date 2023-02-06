import React from 'react'
import style from 'features/router/ui/NavigationListWrapper/style.module.css'

export const NavigationListWrapper = React.memo(({children}) => (
  <nav>
    <ul className={style.container}>{children}</ul>
  </nav>
))
