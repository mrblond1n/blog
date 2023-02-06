import {sample} from 'effector'
import {onRemove} from 'features/common/comments/menu/model/events'
import {removeComment} from 'features/common/comments/state/model/events'
import {$commentsIndex} from 'features/common/comments/state/model/stores'
import {removeCommentFx} from 'features/pages/post/comments/models/remove/effects'
import {$id} from 'features/pages/post/index'

sample({
  clock: onRemove,
  source: {index: $commentsIndex, postId: $id},
  filter: ({postId}) => !!postId,
  fn: ({index, postId}, id) => {
    const {discussion_id: discussionId} = index[id]

    return {id, path: discussionId ? `${postId}/comments/${discussionId}` : postId || ''}
  },
  target: removeCommentFx,
})

sample({
  clock: removeCommentFx.doneData,
  source: $commentsIndex,
  fn: (index, id) => index[id],
  target: removeComment,
})
