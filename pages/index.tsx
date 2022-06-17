import {setNotifyState} from 'features/common/notifications/model/events';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {SectionTemplate} from 'ui/templates/SectionTemplate';

export default () => {
    const handleClick = React.useCallback(() => setNotifyState('OPENED'), []);

    return (
        <SectionTemplate>
            <Button onClick={handleClick}>{'click'}</Button>
        </SectionTemplate>
    );
};
