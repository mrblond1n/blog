import {TData} from 'types'
import {createAuthRequest} from 'utils/requests/requestAuth'
import {createFirestoreRequest} from 'utils/requests/requestFirestore'

export const signUpRequest = (data: {[key: string]: string}) => createAuthRequest('SIGN_UP', data)

export const createUserRequest = (data: TData & {uid: string}) => createFirestoreRequest('SET', 'users', data, data.uid)
