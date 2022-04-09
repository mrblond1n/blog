import React from 'react';
import style from './style.module.css';

export const NavigationListWrapper = React.memo(({children}) => (
    <nav>
        <ul className={style.container}>{children}</ul>
    </nav>
));
