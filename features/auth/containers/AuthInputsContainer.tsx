import {useList} from 'effector-react';
import {onChange} from 'features/auth/model/events';
import {$inputs} from 'features/auth/model/stores';
import React from 'react';
import {Input} from 'ui/atoms/Input';

export const AuthInputsContainer = React.memo(() => {
    const handleChange = React.useCallback(event => onChange(event), []);

    return useList($inputs, input => <Input {...input} label={input.placeholder} onChange={handleChange} />);
});
