import React from 'react';
import style from './style.module.css';

export const Caption = React.memo(({children}) => {
    return <p className={style.caption}>{children}</p>;
});
