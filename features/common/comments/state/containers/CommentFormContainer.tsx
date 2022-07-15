import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {$appState} from 'features/common/app/model/stores';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {intl} from 'utils/intl';

export const CommentFormContainer = React.memo(() => {
    const state = useStore($appState);

    return state === 'AUTHORIZED' ? (
        <FormContainer>
            <Button type="submit">{intl(INTL.COMMENT.ADD)}</Button>
        </FormContainer>
    ) : null;
});
