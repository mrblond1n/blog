import {useGate} from 'effector-react';
import {AuthFormContainer} from 'features/auth/containers/AuthFormContainer';
import {Gate} from 'features/auth/model';
import React from 'react';
import {Page} from 'ui/organisms/Page';

export default () => {
    useGate(Gate);

    return (
        <Page>
            <h1>{'Auth page'}</h1>
            <AuthFormContainer />
        </Page>
    );
};
