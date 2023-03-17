import {createEvent} from 'effector'
import React from 'react'

export const getComments = createEvent<void>()

export const onChange = createEvent<React.ChangeEvent<HTMLFormElement>>()
