import {useGate} from 'effector-react';
import {AuthFormContainer} from 'features/auth/containers/AuthFormContainer';
import {Gate} from 'features/auth/model';
import React from 'react';

export default () => {
    useGate(Gate);

    return (
        <React.Fragment>
            <h1>{'Auth page'}</h1>
            <AuthFormContainer />
        </React.Fragment>
    );
};
