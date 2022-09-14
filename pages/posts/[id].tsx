import {useGate} from 'effector-react';
import {Gate} from 'features/pages/post';
import {ContentContainer as CommentsContainer} from 'features/pages/post/comments/containers/ContentContainer';
import {ContentContainer as PostContainer} from 'features/pages/post/state/containers/ContentContainer';
import {useRouter} from 'next/router';
import React from 'react';

export default () => {
    const router = useRouter();

    useGate(Gate, router.query);

    return (
        <React.Fragment>
            <PostContainer />
            <CommentsContainer />
        </React.Fragment>
    );
};
