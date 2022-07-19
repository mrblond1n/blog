import classnames from 'classnames';
import React from 'react';

import style from './style.module.css';

type TProps = {
    alignItems?: 'center' | 'flex-start' | 'flex-end';
    children: React.ReactNode;
    className?: string;
    direction?: 'row' | 'column' | 'column-reverse' | 'row-reverse';
    fullWidth?: boolean;
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
    margin?: boolean;
    wrap?: boolean;
};

export const Row = React.memo(
    ({alignItems, children, className, direction, fullWidth, justifyContent, margin, wrap}: TProps) => {
        const directionClass = direction && style[('direction-' + direction) as 'directionRow'];
        const alignItemsClass = alignItems && style[('align-items-' + alignItems) as 'alignItemsCenter'];
        const justifyContentClass =
            justifyContent && style[('justify-content-' + justifyContent) as 'justifyContentCenter'];
        const wrapClass = wrap && style.wrap;

        const classNames = classnames(
            style.container,
            wrapClass,
            directionClass,
            alignItemsClass,
            justifyContentClass,
            fullWidth && style.fullWidth,
            margin && style.margin,
            className
        );

        return <div className={classNames}>{children}</div>;
    }
);
