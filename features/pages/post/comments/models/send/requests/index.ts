import {TData} from 'types'
import {createFirestoreRequest} from 'utils/requests/requestFirestore'

export const sendCommentRequest = ({id, ...data}: TData) => createFirestoreRequest('ADD', `posts/${id}/comments`, data)

export const sendReplyRequest = ({id, ...data}: TData) => {
  return createFirestoreRequest('ADD', `posts/${id}/comments/${data.discussion_id}/comments`, data)
}
