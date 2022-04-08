import {useStore} from 'effector-react';
import {FormContainer} from 'features/posts/containers/FormContainer';
import {PostsContainer} from 'features/posts/containers/PostsContainer';
import {$mode} from 'features/posts/model/stores';
import {Error} from 'features/posts/ui/Error';
import {Loader} from 'features/posts/ui/Loader';
import React from 'react';

export const ContentContainer = React.memo(() => {
    const mode = useStore($mode);

    return (
        <div>
            <FormContainer />

            {mode === 'SUCCESS' && <PostsContainer />}
            {mode === 'LOADING' && <Loader />}
            {mode === 'FAILURE' && <Error />}
        </div>
    );
});
