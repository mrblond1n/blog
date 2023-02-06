import React from 'react'
import style from './style.module.css'

type TProps = {
  children: React.ReactNode
  footer?: React.ReactNode
  header?: React.ReactNode
}
export const PageTemplate = React.memo(({children, footer, header}: TProps) => (
  <React.Fragment>
    {header && <header className={style.header}>{header}</header>}
    {children}
    {footer && <footer className={style.footer}>{footer}</footer>}
  </React.Fragment>
))
