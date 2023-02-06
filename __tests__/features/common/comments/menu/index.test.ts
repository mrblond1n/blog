import {comments, reply} from '__mocks__/comments'
import {admin} from '__mocks__/user'
import {setUser} from 'features/app/model/events'
import {$uid} from 'features/app/model/stores'
import 'features/app/model/stores'
import 'features/common/comments'
import {openMenu} from 'features/common/comments/menu/model/events'
import {
  $accessToMenuIndex,
  $currentMenuId,
  $openMenuIndex,
  $prevMenuId,
} from 'features/common/comments/menu/model/store'
import {addReply} from 'features/common/comments/reply/model/events'
import {clearComments, getCommentsCollection} from 'features/common/comments/state/model/events'

beforeAll(() => {
  setUser(admin)
  getCommentsCollection(comments)
})

afterAll(() => {
  clearComments()
})

describe('$accessToMenuIndex', () => {
  setUser(admin)

  const uid = $uid.getState()
  const ownedComments = comments.filter(comment => comment.uid === uid)
  const notOwnedComments = comments.filter(comment => comment.uid !== uid)

  ownedComments.forEach(({id}) => {
    test('should have access if uid current user match with uid of comment', () => {
      expect($accessToMenuIndex.getState()[id]).toBeTruthy()
    })
  })

  notOwnedComments.forEach(({id}) => {
    test('should no have access if uid current user match with uid of comment', () => {
      expect($accessToMenuIndex.getState()[id]).toBeFalsy()
    })
  })

  test('must have access to submitted replies', () => {
    addReply(reply)

    expect($accessToMenuIndex.getState()[reply.id]).toBeTruthy()
  })
})

describe('$openMenuIndex', () => {
  comments.forEach(({id}, index) => {
    test('should be opened after executing function', () => {
      openMenu(id)

      expect($openMenuIndex.getState()[id]).toBeTruthy()
    })

    if (index > 0) {
      test('should be closed prev menu after executing function', () => {
        const item = comments[index - 1]

        openMenu(id)

        expect($openMenuIndex.getState()[item.id]).toBeFalsy()
      })
    }
  })
})

describe('$openedMenuIdHistory', () => {
  comments.forEach(({id}, index) => {
    test('should be equal opened id', () => {
      openMenu(id)

      expect($currentMenuId.getState()).toBe(id)
    })

    if (index > 0) {
      test('should be equal prev opened id', () => {
        const item = comments[index - 1]

        openMenu(id)

        expect($prevMenuId.getState()).toBe(item.id)
      })
    }
  })
})
