import React from 'react';
import style from './style.module.css';

export const SwitchButtonWrapper = React.memo(({children}) => <div className={style.container}>{children}</div>);
