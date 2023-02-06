import {
  getPostRequest,
  updatePostCommentsRequest,
  updatePostWatchesRequest,
} from 'features/pages/post/state/model/requests'
import {PostCodec} from 'types/dtos/posts.dto'
import {createFirebaseEffect} from 'utils/requests/requestEffect'
import {t} from 'utils/validation'

export const getPostFx = createFirebaseEffect({
  codec: PostCodec,
  request: getPostRequest,
})

export const updatePostCommentsFx = createFirebaseEffect({
  codec: t.boolean,
  request: updatePostCommentsRequest,
})

export const updatePostWatchesFx = createFirebaseEffect({
  codec: t.boolean,
  request: updatePostWatchesRequest,
})
