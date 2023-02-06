import {sample} from 'effector'
import {updateCommentLikes} from 'features/common/comments/liked/model/events'
import {$discussion, $repliesCount} from 'features/common/comments/reply/model/stores'
import {removeComment} from 'features/common/comments/state/model/events'
import {$commentsIndex} from 'features/common/comments/state/model/stores'
import {removeCommentFx} from 'features/pages/post/comments/models/remove/effects'
import {sendCommentFx, sendReplyFx} from 'features/pages/post/comments/models/send/effects'
import {updateCommentLikesFx, updateCommentRepliesFx} from 'features/pages/post/comments/models/update/effects'
import {updatePostCommentsFx} from 'features/pages/post/state/model/effects'
import {$post} from 'features/pages/post/state/model/stores'

sample({
  clock: [sendCommentFx.doneData, sendReplyFx.doneData],
  source: $post,
  filter: Boolean,
  fn: ({comments_count, id}) => {
    return {id, comments_count: ++comments_count}
  },
  target: updatePostCommentsFx,
})

sample({
  clock: removeComment,
  source: $post,
  filter: Boolean,
  fn: ({comments_count, id}, {replies}) => ({
    id,
    comments_count: replies ? comments_count - (replies + 1) : comments_count - 1,
  }),
  target: updatePostCommentsFx,
})

sample({
  clock: [removeCommentFx.doneData, sendReplyFx.doneData],
  source: {post: $post, discussion: $discussion, replies: $repliesCount},
  filter: ({discussion, post}) => !!discussion && !!post,
  fn: ({discussion, post, replies}) => {
    if (!discussion || !post) throw new Error('fail')

    return {id: discussion.id, replies, path: post.id}
  },
  target: updateCommentRepliesFx,
})

sample({
  clock: updateCommentLikes,
  source: {index: $commentsIndex, post: $post},
  filter: ({post}) => !!post,
  fn: ({index, post}, {key, ...data}) => {
    if (!post) throw new Error('fail')
    const {discussion_id: discussionId, id} = index[key]

    return {...data, id, path: discussionId ? `${post.id}/comments/${discussionId}` : post.id || ''}
  },
  target: updateCommentLikesFx,
})
