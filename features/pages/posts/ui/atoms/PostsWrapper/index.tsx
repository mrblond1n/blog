import React from 'react'
import style from 'features/pages/posts/ui/atoms/PostsWrapper/style.module.css'

export const PostsWrapper = React.memo(({children}) => <div className={style.container}>{children}</div>)
