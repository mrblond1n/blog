import {useStore} from 'effector-react';
import {$appState, $isAdmin} from 'features/common/app/model/stores';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import {SubmitButtonContainer} from 'features/posts/containers/SubmitButtonContainer';
import React from 'react';

export const CreatePostFormContainer = React.memo(() => {
    const state = useStore($appState);
    const isAdmin = useStore($isAdmin);

    if (!isAdmin || state !== 'AUTHORIZED') return null;

    return (
        <FormContainer>
            <SubmitButtonContainer />
        </FormContainer>
    );
});
