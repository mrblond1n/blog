import {useStore} from 'effector-react';
import {$appState, $isAdmin} from 'features/app/model/stores';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import {SubmitButtonContainer} from 'features/pages/posts/containers/SubmitButtonContainer';
import {TagsFieldContainer} from 'features/pages/posts/containers/TagsFieldContainer';
import React from 'react';
import {Stack} from 'ui/atoms/Stack';

export const CreatePostFormContainer = React.memo(() => {
    const state = useStore($appState);
    const isAdmin = useStore($isAdmin);

    if (!isAdmin || state !== 'AUTHORIZED') return null;

    return (
        <Stack justifyContent="center">
            <FormContainer>
                <TagsFieldContainer />

                <SubmitButtonContainer />
            </FormContainer>
        </Stack>
    );
});
