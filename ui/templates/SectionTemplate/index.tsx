import React from 'react';
import style from './style.module.css';

type TProps = {
    children: React.ReactNode;
    title?: React.ReactNode;
};

export const SectionTemplate = React.memo(({children, title}: TProps) => {
    return (
        <section className={style.section}>
            {title}
            {children}
        </section>
    );
});
