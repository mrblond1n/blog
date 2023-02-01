import React from 'react';
import {TNullable} from 'types';
import {Autocomplete as Component, TextFieldProps} from 'ui/atoms';
import {TextField} from 'ui/atoms/TextField';

type TProps = {
    options: string[];
    onChange: (value: TNullable<string>) => void;
    value?: TNullable<string>;
    fieldProps: TextFieldProps;
};
export const Autocomplete = ({onChange, options, fieldProps, ...props}: TProps) => {
    const handleChange = (_: React.SyntheticEvent<Element, Event>, value: TNullable<string>) => onChange(value);

    return (
        <Component
            {...props}
            onChange={handleChange}
            options={options}
            renderInput={params => <TextField {...params} {...fieldProps} />}
            size="small"
        />
    );
};
