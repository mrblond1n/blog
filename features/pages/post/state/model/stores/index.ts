import {combine, createStore, restore} from 'effector'
import {Gate} from 'features/pages/post/index'
import {setMode, setPost, updatePostComments} from 'features/pages/post/state/model/events'
import {TPostDto} from 'types/dtos/posts.dto'
import {dateFromNow} from 'utils/date'

export const $post = createStore<TPostDto | null>(null)
  .on(setPost, (_, payload) => payload)
  .on(updatePostComments, (state, payload) => state && {...state, ...payload})
  .reset(Gate.close)

export const $author = combine($post, post => post?.author || '')
export const $body = combine($post, post => post?.description || '')
export const $createdAt = combine($post, post => dateFromNow(post?.created_at || ''))
export const $img = combine($post, post => post?.img || '')
export const $title = combine($post, post => post?.title || '')
export const $text = combine($post, post => post?.text || '')

export const $mode = restore(setMode, 'LOADING')
