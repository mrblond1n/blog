import {useStore} from 'effector-react';
import {$appState} from 'features/common/app/model/stores';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import {SubmitButtonContainer} from 'features/post/comments/containers/SubmitButtonContainer';

import React from 'react';

export const CommentFormContainer = React.memo(() => {
    const state = useStore($appState);

    return state === 'AUTHORIZED' ? (
        <FormContainer>
            <SubmitButtonContainer />
        </FormContainer>
    ) : null;
});
