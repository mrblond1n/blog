import {useGate, useStore} from 'effector-react';
import {$appState} from 'features/common/app/model/stores';
import {LinkContainer} from 'features/signin/containers/LinkContainer';
import {Gate} from 'features/signin/model';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import React from 'react';
import {SubmitButtonContainer} from 'features/signin/containers/SubmitButtonContainer';
import {SectionTemplate} from 'ui/templates/SectionTemplate';
import {Row} from 'ui/atoms/Row';

export default () => {
    useGate(Gate);
    const state = useStore($appState);

    if (state !== 'UNAUTHORIZED') return null;

    return (
        <SectionTemplate title={<h1>{'SIGN IN PAGE'}</h1>}>
            <Row justifyContent="center">
                <FormContainer>
                    <SubmitButtonContainer />
                </FormContainer>
            </Row>

            <LinkContainer />
        </SectionTemplate>
    );
};
