import classnames from 'classnames';
import React from 'react';
import {Row} from 'ui/atoms/Row';

import style from './style.module.css';

type TProps = {
    children: React.ReactNode;
    colorScheme: string;
};

export const SnackbarWrapper = React.memo(({children, colorScheme}: TProps) => (
    <Row
        alignItems="flex-start"
        className={classnames(style.container, style[colorScheme])}
        justifyContent="space-between"
    >
        {children}
    </Row>
));

export default SnackbarWrapper;
