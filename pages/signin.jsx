import {useGate, useStore} from 'effector-react';
import {$appState} from 'features/app/model/stores';
import {LinkContainer} from 'features/pages/signin/containers/LinkContainer';
import {Gate} from 'features/pages/signin/model';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import React from 'react';
import {SubmitButtonContainer} from 'features/pages/signin/containers/SubmitButtonContainer';
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
