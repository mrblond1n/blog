import {useStore} from 'effector-react';
import {$appState} from 'features/app/model/stores';
import {FormContainer} from 'features/form/containers/FormContainer';
import React from 'react';

export const CreatePostFormContainer = React.memo(() => {
    const state = useStore($appState);

    return state === 'AUTHORIZED' ? <FormContainer /> : <FormContainer />;
});
