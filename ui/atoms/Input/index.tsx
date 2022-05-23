import React, {InputHTMLAttributes} from 'react';
import style from 'ui/atoms/Input/style.module.css';

interface IProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
}

export const Input = React.memo(({label, ...props}: IProps) => {
    return (
        <label className={style.container} data-testid={`input_${props.name}`}>
            {label && <p className={style.title}>{label}</p>}
            {props.type === 'textarea' ? (
                <textarea {...props} className={style.input} />
            ) : (
                <input {...props} className={style.input} />
            )}
        </label>
    );
});
