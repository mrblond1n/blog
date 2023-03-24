import {LIMITS} from 'constants/business'
import {TData, TNullable} from 'types'

import {createFirestoreRequest} from 'utils/requests/requestFirestore'
import {createStorageRequest} from 'utils/requests/requestStorage'

export const addPostRequest = (data: TData) => createFirestoreRequest('ADD', 'posts', data)

export const savePostImageRequest = ({url, file}: {url: string; file: TNullable<File>}) => {
  if (!file) throw new Error('file not found')

  return createStorageRequest('UPLOAD', url, file)
}

export const getPostsRequest = () =>
  createFirestoreRequest('GET_LIST', 'posts', {order: ['created_at', 'desc'], limit: LIMITS.POSTS})

export const removePostRequest = (id: string) => createFirestoreRequest('REMOVE', 'posts', id)
