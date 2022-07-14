import React from 'react';
import {Card} from 'ui/atoms/Card';
import style from './style.module.css';

export const CommentWrapper = React.memo(({children}) => <Card.Main className={style.container}>{children}</Card.Main>);
