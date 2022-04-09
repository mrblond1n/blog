import React from 'react';
import style from './style.module.css';

export const NavigationLinkWrapper = React.memo(({children}) => <li className={style.container}>{children}</li>);
