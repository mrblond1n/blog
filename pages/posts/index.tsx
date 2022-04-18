import {useGate} from 'effector-react';
import {ContentContainer} from 'features/posts/containers/ContentContainer';
import {UpdateButtonContainer} from 'features/posts/containers/UpdateButtonContainer';
import {Gate} from 'features/posts/model';
import React from 'react';
import {Page} from 'ui/organisms/Page';

export default () => {
    useGate(Gate);

    return (
        <Page>
            <h1>{'POSTS'}</h1>

            <UpdateButtonContainer />

            <ContentContainer />
        </Page>
    );
};
