import React from 'react'
import style from 'features/pages/posts/ui/atoms/PostWrapper/style.module.css'

type TProps = {
  children: React.ReactNode
  id: string
}

export const PostWrapper = React.memo(({children, id}: TProps) => (
  <div className={style.container} data-testid={`post_${id}`}>
    {children}
  </div>
))
