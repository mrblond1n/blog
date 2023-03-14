import {createEvent} from 'effector'

export const updateDiscussion = createEvent<{id: string; replies: number}>()
