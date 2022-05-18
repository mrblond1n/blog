import {useGate, useStore} from 'effector-react';
import {$appState} from 'features/common/app/model/stores';
import {LinkContainer} from 'features/signup/containers/LinkContainer';
import {Gate} from 'features/signup/model';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import React from 'react';
import {SubmitButtonContainer} from 'features/signup/containers/SubmitButtonContainer';

export default () => {
    useGate(Gate);
    const state = useStore($appState);

    if (state !== 'UNAUTHORIZED') return null;

    return (
        <React.Fragment>
            <h1>{'SIGN UP PAGE'}</h1>

            <FormContainer>
                <SubmitButtonContainer />
            </FormContainer>

            <LinkContainer />
        </React.Fragment>
    );
};
