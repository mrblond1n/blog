import {TData} from 'types'
import {createFirestoreRequest} from 'utils/requests/requestFirestore'

export const getPostRequest = (id: string) => createFirestoreRequest('GET', 'posts', id)

export const removePostRequest = (id: string) => createFirestoreRequest('REMOVE', 'posts', id)

export const updatePostWatchesRequest = ({id, ...data}: TData & {id: string}) =>
  createFirestoreRequest('UPDATE', 'posts', data, id)

export const updatePostCommentsRequest = ({id, ...data}: TData & {id: string}) =>
  createFirestoreRequest('UPDATE', 'posts', data, id)
