import React from 'react';
import {Autocomplete as Component, TextFieldProps} from 'ui/atoms';
import {TextField} from 'ui/atoms/TextField';

type TProps = {
    options: string[];
    onChange: (value: string[]) => void;
    value?: string[];
    fieldProps?: TextFieldProps;
};
export const MultipleAutocomplete = ({onChange, options, fieldProps, ...props}: TProps) => {
    const handleChange = (_: React.SyntheticEvent<Element, Event>, value: string[]) => onChange(value);

    return (
        <Component
            {...props}
            disableCloseOnSelect
            multiple
            onChange={handleChange}
            options={options}
            renderInput={params => <TextField {...params} {...fieldProps} />}
            size="small"
        />
    );
};
