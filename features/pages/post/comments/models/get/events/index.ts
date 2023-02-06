import {createEvent} from 'effector'
import React from 'react'
import {TCommentDto} from 'types/dtos/comments.dto'

export const addComment = createEvent<TCommentDto>()
export const getComments = createEvent<void>()

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS'
export const setMode = createEvent<TMode>()

export const onKeyDown = createEvent<React.KeyboardEvent<HTMLFormElement>>()
export const onChange = createEvent<React.ChangeEvent<HTMLFormElement>>()
