import {createEvent} from 'effector'

export const closeModal = createEvent<string>()
export const openModal = createEvent<string>()
export const resetModals = createEvent<void>()
export const setModal = createEvent<{id: string; title: string}>()
