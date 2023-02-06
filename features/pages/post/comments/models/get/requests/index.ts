import {createFirestoreRequest} from 'utils/requests/requestFirestore'

export const getCommentsRequest = (id: string) => createFirestoreRequest('GET_LIST', `posts/${id}/comments`)
