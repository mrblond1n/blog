import React from 'react';
import {Row} from 'ui/atoms/Row';
import style from './style.module.css';

export const CommentWrapper = React.memo(({children}) => <Row className={style.container}>{children}</Row>);
