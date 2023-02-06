import {
  addPostRequest,
  getPostsRequest,
  removePostRequest,
  savePostImageRequest,
} from 'features/pages/posts/model/requests'
import {PostCodec, PostsCodec} from 'types/dtos/posts.dto'
import {createFirebaseEffect, createStorageEffect} from 'utils/requests/requestEffect'
import * as t from 'utils/validation'

export const getPostsFx = createFirebaseEffect({
  codec: PostsCodec,
  request: getPostsRequest,
})

export const addPostFx = createFirebaseEffect({
  codec: PostCodec,
  request: addPostRequest,
})

export const removePostFx = createFirebaseEffect({
  codec: t.string,
  request: removePostRequest,
})

export const saveImageFx = createStorageEffect({
  codec: t.string,
  request: savePostImageRequest,
})
