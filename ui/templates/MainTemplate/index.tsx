import classnames from 'classnames'
import React from 'react'
import style from './style.module.css'
import {Roboto} from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
})

type TProps = {
  children: React.ReactNode
  side?: React.ReactNode
}

export const MainTemplate = React.memo(({children, side}: TProps) => {
  return (
    <main className={classnames(style.main, roboto.className)}>
      <article className={style.article}>{children}</article>
      {side && <aside className={style.aside}>{side}</aside>}
    </main>
  )
})
