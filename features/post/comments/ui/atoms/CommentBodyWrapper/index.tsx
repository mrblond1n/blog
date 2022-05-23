import React from 'react';
import style from './style.module.css';

export const CommentBodyWrapper = React.memo(({children}) => <div className={style.container}>{children}</div>);
