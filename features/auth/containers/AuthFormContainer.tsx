import {useList} from 'effector-react';
import {SubmitButtonContainer} from 'features/auth/containers/SubmitButtonContainer';
import {SwitchButtonContainer} from 'features/auth/containers/SwitchButtonContainer';
import {onChange, onSubmit} from 'features/auth/model/events';
import {$inputs} from 'features/auth/model/stores';
import React from 'react';
import {Input} from 'ui/atoms/Input';
import {Form} from 'ui/molecules/Form';

export const AuthFormContainer = React.memo(() => {
    const handleSubmit = React.useCallback(() => onSubmit(), []);
    const handleChange = React.useCallback(event => onChange(event), []);

    return (
        <Form onSubmit={handleSubmit}>
            {useList($inputs, input => (
                <Input {...input} label={input.placeholder} onChange={handleChange} />
            ))}

            <SubmitButtonContainer />

            <SwitchButtonContainer />
        </Form>
    );
});
