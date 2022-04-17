import {useGate} from 'effector-react';
import {ContentContainer} from 'features/post/containers/ContentContainer';
import {Gate} from 'features/post/model';
import {useRouter} from 'next/router';
import React from 'react';
import {Page} from 'ui/organisms/Page';

export default () => {
    const router = useRouter();

    useGate(Gate, router.query);

    return (
        <Page>
            <ContentContainer />
        </Page>
    );
};
