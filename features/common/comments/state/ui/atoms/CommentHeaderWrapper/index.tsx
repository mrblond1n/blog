import React from 'react';
import {Row} from 'ui/atoms/Row';
import style from './style.module.css';

export const CommentHeaderWrapper = React.memo(({children}) => (
    <Row alignItems="flex-end" className={style.container}>
        {children}
    </Row>
));
