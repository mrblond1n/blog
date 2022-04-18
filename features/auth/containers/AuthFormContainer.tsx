import {AuthInputsContainer} from 'features/auth/containers/AuthInputsContainer';
import {SubmitButtonContainer} from 'features/auth/containers/SubmitButtonContainer';
import {SwitchButtonContainer} from 'features/auth/containers/SwitchButtonContainer';
import {onSubmit} from 'features/auth/model/events';
import React from 'react';
import {Form} from 'ui/molecules/Form';

export const AuthFormContainer = React.memo(() => {
    const handleSubmit = React.useCallback(() => onSubmit(), []);

    return (
        <Form onSubmit={handleSubmit}>
            <AuthInputsContainer />

            <SubmitButtonContainer />

            <SwitchButtonContainer />
        </Form>
    );
});
