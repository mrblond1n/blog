import {useGate} from 'effector-react';
import {ContentContainer} from 'features/posts/containers/ContentContainer';
import {Gate} from 'features/posts/model';
import {onClick} from 'features/posts/model/events';
import React from 'react';
import {Button} from 'ui/atoms/Button';
import {Page} from 'ui/organisms/Page';

export default () => {
    useGate(Gate);

    const handleClick = React.useCallback(() => onClick(), []);

    return (
        <Page>
            <h1>{'POSTS'}</h1>

            <Button onClick={handleClick}>{'Update posts'}</Button>

            <ContentContainer />
        </Page>
    );
};
