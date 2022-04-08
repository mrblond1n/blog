import {useStore} from 'effector-react';
import {PostContainer} from 'features/post/containers/PostContainer';
import {$mode} from 'features/post/model/stores';
import {Error} from 'features/posts/ui/Error';
import {Loader} from 'features/posts/ui/Loader';
import React from 'react';

export const ContentContainer = () => {
    const mode = useStore($mode);

    return (
        <div>
            {mode === 'SUCCESS' && <PostContainer />}
            {mode === 'LOADING' && <Loader />}
            {mode === 'FAILURE' && <Error />}
        </div>
    );
};
