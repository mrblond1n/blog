import {comment, comments, reply} from '__mocks__/comments'
import {post} from '__mocks__/post'
import 'features/common/comments/'
import {clearComments} from 'features/common/comments/state/model/events'
import {$commentsIndex} from 'features/common/comments/state/model/stores'
import 'features/pages/post/comments/models'
import {getCommentsFx} from 'features/pages/post/comments/models/get/effects'
import {removeCommentFx} from 'features/pages/post/comments/models/remove/effects'
import {sendCommentFx, sendReplyFx} from 'features/pages/post/comments/models/send/effects'
import 'features/pages/post/state/model'
import {getPostFx, updatePostCommentsFx} from 'features/pages/post/state/model/effects'
import {$post} from 'features/pages/post/state/model/stores'

beforeAll(async () => {
  getPostFx.use(() => post)
  await getPostFx(post.id)

  getCommentsFx.use(() => comments)
  await getCommentsFx(post.id)
})

afterAll(() => {
  clearComments()
})

describe('update post', () => {
  test('should increase comments_count after send comment', async () => {
    sendCommentFx.use(() => comment)
    await sendCommentFx(comment)

    updatePostCommentsFx.use(() => true)
    await updatePostCommentsFx({id: post.id, comments_count: ++post.comments_count})

    expect(Object.values($commentsIndex.getState()).length).toEqual($post.getState()?.comments_count)
  })
  test('should increase comments_count after send reply', async () => {
    sendReplyFx.use(() => reply)
    await sendReplyFx(reply)

    updatePostCommentsFx.use(() => true)
    await updatePostCommentsFx({id: post.id, comments_count: ++post.comments_count})
    expect(Object.values($commentsIndex.getState()).length).toEqual($post.getState()?.comments_count)
  })

  test('should decrease comments_count after remove comment', async () => {
    const [comment] = Object.values($commentsIndex.getState()).filter(({replies}) => replies >= 2)

    removeCommentFx.use(() => comment.id)
    await removeCommentFx({id: comment.id, path: ''})

    updatePostCommentsFx.use(() => true)
    await updatePostCommentsFx({id: post.id, comments_count: post.comments_count - (comment.replies + 1)})

    expect(Object.values($commentsIndex.getState()).length).toEqual($post.getState()?.comments_count)
  })

  test('should decrease comments_count after remove reply', async () => {
    const [reply] = Object.values($commentsIndex.getState()).filter(({discussion_id}) => !!discussion_id)
    const post = $post.getState()

    if (!post) return
    removeCommentFx.use(() => reply.id)
    await removeCommentFx({id: reply.id, path: ''})

    updatePostCommentsFx.use(() => true)
    await updatePostCommentsFx({id: post.id, comments_count: post.comments_count - 1})

    expect(Object.values($commentsIndex.getState()).length).toEqual($post.getState()?.comments_count)
  })
})
