import {forward, sample} from 'effector'
import {$displayName, $uid} from 'features/app/model/stores'
import {addReply, closeOpened, sendReply} from 'features/common/comments/reply/model/events'
import {addComment, sendComment} from 'features/common/comments/state/model/events'
import {clearValues} from 'features/common/form/model/events'
import {sendCommentFx, sendReplyFx} from 'features/pages/post/comments/models/send/effects'
import {$id, Gate} from 'features/pages/post/index'

sample({
  clock: sendReply,
  source: {uid: $uid, author: $displayName, id: $id},
  filter: Gate.status,
  fn: ({id, ...user}, comment) => ({...comment, ...user, id: id || ''}),
  target: sendReplyFx,
})

sample({
  clock: sendComment,
  source: {uid: $uid, author: $displayName, id: $id},
  filter: ({id}) => !!id,
  fn: ({id, ...user}, comment) => ({...comment, ...user, id: id || ''}),
  target: sendCommentFx,
})

forward({
  from: sendReplyFx.doneData,
  to: addReply,
})

forward({
  from: sendCommentFx.doneData,
  to: addComment,
})

forward({
  from: sendCommentFx.doneData,
  to: clearValues,
})

sample({
  clock: sendReplyFx.doneData.map(({reply_id}) => reply_id),
  filter: Boolean,
  target: closeOpened,
})
