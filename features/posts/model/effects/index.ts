import {addPostRequest, getPostsRequest, removePostRequest} from 'features/posts/model/requests';
import {PostCodec, PostsCodec} from 'types/dtos/posts.dto';
import {createFirebaseEffect} from 'utils/requestEffect';
import * as t from 'utils/validation';

export const getPostsFx = createFirebaseEffect({
    codec: PostsCodec,
    request: getPostsRequest,
});

export const addPostFx = createFirebaseEffect({
    codec: PostCodec,
    request: addPostRequest,
});

export const removePostFx = createFirebaseEffect({
    codec: t.string,
    request: removePostRequest,
});
