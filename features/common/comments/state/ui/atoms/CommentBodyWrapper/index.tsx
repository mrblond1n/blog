import React from 'react';
import {Body} from 'ui/atoms/Body';
import style from './style.module.css';

export const CommentBodyWrapper = React.memo(({children}) => <Body className={style.container}>{children}</Body>);
