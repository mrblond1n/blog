import React, {InputHTMLAttributes} from 'react';
import style from 'ui/atoms/Input/style.module.css';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = React.memo(({label, ...props}: IProps) => {
    return (
        <label className={style.container} data-testid={`input_${props.name}`}>
            <p className={style.title}>{label}</p>
            <input {...props} className={style.input} />
        </label>
    );
});
