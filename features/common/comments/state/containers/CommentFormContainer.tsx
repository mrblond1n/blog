import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {$appState} from 'features/app/model/stores';
import {FormContainer} from 'features/common/form/containers/FormContainer';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {Row} from 'ui/atoms/Row';
import {intl} from 'utils/intl';

export const CommentFormContainer = React.memo(() => {
    const state = useStore($appState);

    return state === 'AUTHORIZED' ? (
        <FormContainer>
            <Row justifyContent="flex-end">
                <Button type="submit">{intl(INTL.COMMENT.ACTION.SEND)}</Button>
            </Row>
        </FormContainer>
    ) : null;
});
