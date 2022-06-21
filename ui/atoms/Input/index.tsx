import {TextField as MUIInput, TextFieldProps} from '@mui/material';
import React from 'react';

export const Input = React.memo(({label, ...props}: TextFieldProps) => (
    <MUIInput label={label} {...props} multiline={props.type === 'textarea'} />
));
