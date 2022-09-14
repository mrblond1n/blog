import {INTL} from 'constants/intl';
import {useStore} from 'effector-react';
import {PostsContainer} from 'features/pages/posts/containers/PostsContainer';
import {$mode} from 'features/pages/posts/model/stores';
import {Error} from 'features/pages/posts/ui/Error';
import {Loader} from 'features/pages/posts/ui/Loader';
import React from 'react';
import {Body} from 'ui/atoms/Body';
import {intl} from 'utils/intl';

export const ContentContainer = React.memo(() => {
    const mode = useStore($mode);

    return (
        <>
            {mode === 'SUCCESS' && <PostsContainer />}
            {mode === 'LOADING' && <Loader />}
            {mode === 'FAILURE' && <Error />}
            {mode === 'NOT_FOUND' && <Body>{intl(INTL.POSTS.NOT_FOUND)}</Body>}
        </>
    );
});
