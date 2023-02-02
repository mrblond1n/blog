import React from 'react';
import {TValue} from 'types';
import {TextFieldProps} from 'types/components';
import {TextField as Component} from 'ui/atoms';

type TProps = {
    onChange?: (value: TValue) => void;
} & Omit<TextFieldProps, 'onChange'>;

export const TextField = ({onChange, ...props}: TProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value);
    const value = props.value || '';

    return <Component onChange={handleChange} size="small" {...props} value={value} />;
};
