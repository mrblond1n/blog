import {useStore} from 'effector-react';
import {PostContainer} from 'features/post/state/containers/PostContainer';
import {$mode} from 'features/post/state/model/stores';
import {Error} from 'features/posts/ui/Error';
import {Loader} from 'features/posts/ui/Loader';
import React from 'react';
import {SectionTemplate} from 'ui/templates/SectionTemplate';

export const ContentContainer = () => {
    const mode = useStore($mode);

    return (
        <SectionTemplate>
            {mode === 'SUCCESS' && <PostContainer />}
            {mode === 'LOADING' && <Loader />}
            {mode === 'FAILURE' && <Error />}
        </SectionTemplate>
    );
};
