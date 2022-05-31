import {useGate, useStore} from 'effector-react';
import {$appState} from 'features/common/app/model/stores';
import {LinkContainer} from 'features/signin/containers/LinkContainer';
import {Gate} from 'features/signin/model';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import React from 'react';
import {SubmitButtonContainer} from 'features/signin/containers/SubmitButtonContainer';
import {SectionTemplate} from 'ui/templates/SectionTemplate';

export default () => {
    useGate(Gate);
    const state = useStore($appState);

    if (state !== 'UNAUTHORIZED') return null;

    return (
        <SectionTemplate title={<h1>{'SIGN IN PAGE'}</h1>}>
            <FormContainer>
                <SubmitButtonContainer />
            </FormContainer>

            <LinkContainer />
        </SectionTemplate>
    );
};
