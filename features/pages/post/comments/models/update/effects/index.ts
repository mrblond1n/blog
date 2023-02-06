import {
  updateCommentLikesRequest,
  updateCommentRepliesRequest,
} from 'features/pages/post/comments/models/update/requests'
import {createFirebaseEffect} from 'utils/requests/requestEffect'
import {t} from 'utils/validation'

export const updateCommentLikesFx = createFirebaseEffect({
  codec: t.boolean,
  request: updateCommentLikesRequest,
})

export const updateCommentRepliesFx = createFirebaseEffect({
  codec: t.boolean,
  request: updateCommentRepliesRequest,
})
