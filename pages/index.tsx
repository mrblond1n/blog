import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {$appState, $displayName} from 'features/common/app/model/stores';
import React from 'react';
import {Body} from 'ui/atoms/Body';
import {SectionTemplate} from 'ui/templates/SectionTemplate';
import {intl} from 'utils/intl';

export default () => {
    const displayName = useStore($displayName);
    const state = useStore($appState);

    return (
        <SectionTemplate title={<h1>{'Welcome page'}</h1>}>
            <h1>{`Hi, ${displayName}!`}</h1>

            {state === 'UNAUTHORIZED' && <Body>{intl(INTL.WELCOME.UNAUTHORIZED_USER)}</Body>}
        </SectionTemplate>
    );
};
