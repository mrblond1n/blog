import React from 'react';
import {TNullable} from 'types';
import {TextFieldProps} from 'types/components';
import {Autocomplete as Component} from 'ui/atoms';
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
