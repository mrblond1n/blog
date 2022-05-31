import {useGate} from 'effector-react';
import {ContentContainer as CommentsContainer} from 'features/post/comments/containers/ContentContainer';
import {ContentContainer as PostContainer} from 'features/post/state/containers/ContentContainer';
import {Gate} from 'features/post';
import {useRouter} from 'next/router';
import React from 'react';
import {SectionTemplate} from 'ui/templates/SectionTemplate';

export default () => {
    const router = useRouter();

    useGate(Gate, router.query);

    return (
        <SectionTemplate>
            <PostContainer />
            <CommentsContainer />
        </SectionTemplate>
    );
};
