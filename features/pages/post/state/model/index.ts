import {forward, sample} from 'effector'
import 'features/pages/post/comments/models'
import {resetModals} from 'features/common/modal/models/events'
import {
  getPostFx,
  removePostFx,
  updatePostCommentsFx,
  updatePostWatchesFx,
} from 'features/pages/post/state/model/effects'
import {removePost, setMode, setPost, updatePostComments} from 'features/pages/post/state/model/events'
import {toPage} from 'features/router/model/events'
import {ROUTES} from 'routes'

forward({
  from: getPostFx.doneData,
  to: [setMode.prepend(() => 'SUCCESS'), setPost],
})

forward({
  from: getPostFx.failData,
  to: setMode.prepend(() => 'FAILURE'),
})

sample({
  clock: getPostFx.doneData,
  fn: ({id, watches_count}) => ({id, watches_count: ++watches_count}),
  target: updatePostWatchesFx,
})

sample({
  clock: updatePostCommentsFx.done,
  fn: ({params: {comments_count}}) => ({comments_count}),
  target: updatePostComments,
})

sample({
  clock: removePost,
  target: removePostFx,
})

sample({
  clock: removePostFx.doneData,
  fn: () => ROUTES.HOME,
  target: [toPage, resetModals],
})
