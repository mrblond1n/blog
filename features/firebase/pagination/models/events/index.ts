import {QueryDocumentSnapshot} from '@firebase/firestore'
import {createEvent} from 'effector'

export const setLastItem = createEvent<{key: string; value: QueryDocumentSnapshot}>()
export const resetListItem = createEvent<string>()
export const resetPaginationIndexes = createEvent<void>()
