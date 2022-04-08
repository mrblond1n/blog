import React, {ButtonHTMLAttributes} from 'react';
import style from 'ui/atoms/Button/Button.module.css';

export const Button = React.memo(({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className={style.button} {...props}>
            {children}
        </button>
    );
});
