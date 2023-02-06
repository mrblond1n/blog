import classnames from 'classnames'
import React from 'react'
import style from './style.module.css'

export const PageLoader = React.memo(() => {
  return (
    <div className={style.container}>
      <div className={style.loader}>
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" id="test" r="32"></circle>
        </svg>
      </div>

      <div className={classnames(style.loader, style.triangle)}>
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>

      <div className={style.loader}>
        <svg viewBox="0 0 80 80">
          <rect height="64" width="64" x="8" y="8"></rect>
        </svg>
      </div>
    </div>
  )
})
