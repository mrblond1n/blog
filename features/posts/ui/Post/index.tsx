import React from 'react';
import style from './Post.module.css';

export const Post = React.memo(({children}) => <div className={style.post}>{children}</div>);
