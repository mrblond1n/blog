import {useGate} from 'effector-react';
import {ContentContainer} from 'features/posts/containers/ContentContainer';
import {CreatePostFormContainer} from 'features/posts/containers/CreatePostFormContainer';
import {Gate} from 'features/posts/model';
import React from 'react';

export default () => {
    useGate(Gate);

    return (
        <React.Fragment>
            <h1>{'POSTS'}</h1>

            <CreatePostFormContainer />

            <ContentContainer />
        </React.Fragment>
    );
};
