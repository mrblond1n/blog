import {createEvent} from 'effector'
import {TData} from 'types'
import {TPostDto} from 'types/dtos/posts.dto'

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS'
export const setMode = createEvent<TMode>()

export const removePost = createEvent<string>()

export const setPost = createEvent<TPostDto>()
export const updatePostComments = createEvent<TData>()
