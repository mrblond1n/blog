import React from 'react';
import style from 'features/common/navigation/ui/NavigationLinkWrapper/style.module.css';

export const NavigationLinkWrapper = React.memo(({children}) => <li className={style.container}>{children}</li>);
