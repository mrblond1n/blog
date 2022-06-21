import React, {FormEvent, InputHTMLAttributes} from 'react';
import style from './style.module.css';

interface IProps extends InputHTMLAttributes<HTMLFormElement> {
    refWrapper?: React.RefObject<HTMLFormElement>;
}

export const Form = React.memo(({children, onSubmit, refWrapper, ...props}: IProps) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <form {...props} ref={refWrapper} aria-label="form" className={style.container} onSubmit={handleSubmit}>
            {children}
        </form>
    );
});
