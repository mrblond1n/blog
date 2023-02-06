import {comments} from '__mocks__/comments'
import {admin} from '__mocks__/user'
import {setUser} from 'features/app/model/events'
import 'features/common/comments'
import {onDislike, onLike} from 'features/common/comments/liked/model/events'
import {$dislikedUsersIndex, $likedUsersIndex} from 'features/common/comments/liked/model/stores'
import {clearComments, getCommentsCollection} from 'features/common/comments/state/model/events'
import {$commentsIndex} from 'features/common/comments/state/model/stores'

beforeAll(() => {
  setUser(admin)
  getCommentsCollection(comments)
})

afterAll(() => {
  clearComments()
})

describe('$likedUsersIndex', () => {
  comments.forEach(({id}) => {
    test('should be added one user to liked container after like button click', () => {
      onLike(id)
      const likedIndex = $likedUsersIndex.getState()
      const commentsIndex = $commentsIndex.getState()

      expect(likedIndex[id].length).toEqual(commentsIndex[id].liked.length + 1)
    })

    test('should be removed one user to liked container after repeat like button click', () => {
      onLike(id)
      const likedIndex = $likedUsersIndex.getState()
      const commentsIndex = $commentsIndex.getState()

      expect(likedIndex[id].length).toEqual(commentsIndex[id].liked.length)
    })
  })
})

describe('$dislikedUsersIndex', () => {
  comments.forEach(({id}) => {
    test('should be added one user to disliked container after dislike button click', () => {
      onDislike(id)
      const dislikedIndex = $dislikedUsersIndex.getState()
      const commentsIndex = $commentsIndex.getState()

      expect(dislikedIndex[id].length).toEqual(commentsIndex[id].disliked.length + 1)
    })

    test('should be removed one user to disliked container after repeat dislike button click', () => {
      onDislike(id)
      const dislikedIndex = $dislikedUsersIndex.getState()
      const commentsIndex = $commentsIndex.getState()

      expect(dislikedIndex[id].length).toEqual(commentsIndex[id].disliked.length)
    })
  })
})
