import classnames from 'classnames'
import React from 'react'
import {Animation} from 'ui/organisms/Animation'

import style from 'features/notifications/ui/atoms/NotifyWrapper/style.module.css'

type TProps = {
  children: React.ReactNode
  delay: number
  isActive: boolean
  onOutsideClick: () => void
}

export const NotifyWrapper = React.memo(({children, delay, isActive, onOutsideClick}: TProps) => {
  return (
    <Animation
      classNames={classnames(style.container, isActive ? style.fadeIn : style.fadeOut)}
      delay={delay}
      onOutsideClick={onOutsideClick}
      show={isActive}
    >
      {children}
    </Animation>
  )
})
