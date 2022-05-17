import {useGate, useStore} from 'effector-react';
import {$appState} from 'features/app/model/stores';
import {LinkContainer} from 'features/signin/containers/LinkContainer';
import {Gate} from 'features/signin/model';
import {FormContainer} from 'features/form/containers/FormContainer';
import React from 'react';

export default () => {
    useGate(Gate);
    const state = useStore($appState);

    if (state !== 'UNAUTHORIZED') return null;

    return (
        <React.Fragment>
            <h1>{'SIGN IN PAGE'}</h1>
            <FormContainer />
            <LinkContainer />
        </React.Fragment>
    );
};
