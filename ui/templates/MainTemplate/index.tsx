import React from 'react';
import style from './style.module.css';

type TProps = {
    children: React.ReactNode;
    side?: React.ReactNode;
};

export const MainTemplate = React.memo(({children, side}: TProps) => {
    return (
        <main className={style.main}>
            <article className={style.article}>{children}</article>
            {side && <aside className={style.aside}>{side}</aside>}
        </main>
    );
});
