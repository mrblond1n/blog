import {useGate, useStore} from 'effector-react';
import {$appState} from 'features/app/model/stores';
import {AuthFormContainer} from 'features/auth/containers/AuthFormContainer';
import {Gate} from 'features/auth/model';
import React from 'react';

export default () => {
    useGate(Gate);
    const appstate = useStore($appState);

    if (appstate !== 'UNAUTHORIZED') return null;

    return (
        <React.Fragment>
            <h1>{'Auth page'}</h1>
            <AuthFormContainer />
        </React.Fragment>
    );
};
