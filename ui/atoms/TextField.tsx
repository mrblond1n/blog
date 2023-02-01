import React from 'react';
import {TextFieldProps} from 'types/components';
import {TextField as Component} from 'ui/atoms';

export const TextField = (props: TextFieldProps) => <Component size="small" {...props} />;
