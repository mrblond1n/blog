import {useGate, useStore} from 'effector-react';
import {$appState} from 'features/app/model/stores';
import {LinkButtonContainer} from 'features/signup/containers/LinkButtonContainer';
import {Gate} from 'features/signup/model';
import {FormContainer} from 'features/form/containers/FormContainer';
import React from 'react';

export default () => {
    useGate(Gate);
    const state = useStore($appState);

    if (state !== 'UNAUTHORIZED') return null;

    return (
        <React.Fragment>
            <h1>{'SIGN UP PAGE'}</h1>
            <FormContainer />
            <LinkButtonContainer />
        </React.Fragment>
    );
};
