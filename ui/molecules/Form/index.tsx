import React, {InputHTMLAttributes} from 'react';
import style from './style.module.css';

export const Form = React.memo(({onSubmit, children, ...props}: InputHTMLAttributes<HTMLFormElement>) => {
    const ref = React.useRef<HTMLFormElement>(null);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    React.useEffect(() => {
        ref.current?.reset();
    }, [ref.current?.elements]);

    return (
        <form ref={ref} aria-label="form" {...props} className={style.container} onSubmit={handleSubmit}>
            {children}
        </form>
    );
});
