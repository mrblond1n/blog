import {LIMITS} from 'constants/business'
import {combine, createStore, restore} from 'effector'
import {$uid} from 'features/app/model/stores'
import {getPostsFx} from 'features/pages/posts/model/effects'
import {
  addNewPost,
  addPost,
  clearIndex,
  onRemove,
  removePost,
  resetDisable,
  setMode,
} from 'features/pages/posts/model/events'

import {TPostDto} from 'types/dtos/posts.dto'
import {createIndex} from 'utils/stack'

export const $mode = restore(setMode, 'LOADING')

export const $buttonIsVisible = createStore<boolean>(false)
  .on(getPostsFx.doneData, (_, payload) => payload.length === LIMITS.POSTS)
  .reset(clearIndex)

export const $buttonIsDisabled = combine(getPostsFx.pending, value => value)

export const $postsIndex = createStore(createIndex<TPostDto>())
  .on(addPost, (index, post) => index.set({key: post.id, value: post}))
  .on(addNewPost, (index, post) => index.set({key: post.id, value: post}))
  .on(removePost, (index, id) => index.remove({key: id}))
  .on(clearIndex, index => index.clear())
  .map(value => value.getRaw())

export const $disabledIndex = createStore(createIndex<boolean>())
  .on(addPost, (index, post) => index.set({key: post.id, value: false}))
  .on(onRemove, (index, id) => index.set({key: id, value: true}))
  .on(removePost, (index, id) => index.remove({key: id}))
  .on(resetDisable, (index, id) => index.set({key: id, value: false}))
  .on(clearIndex, index => index.clear())
  .map(value => value.getRaw())

export const $ownedIndex = createStore(createIndex<boolean>())
  .on(addPost, (index, post) => index.set({key: post.id, value: post.uid === $uid.getState()}))
  .on(removePost, (index, id) => index.remove({key: id}))
  .on(clearIndex, index => index.clear())
  .map(value => value.getRaw())

export const $idsList = createStore<string[]>([])
  .on(addPost, (state, {id}) => (state.includes(id) ? state : [...state, id]))
  .on(addNewPost, (state, {id}) => [id, ...state])
  .on(removePost, (state, id) => state.filter(item => item !== id))
  .reset(clearIndex)
