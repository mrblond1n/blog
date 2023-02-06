import {createUserWithEmailAndPassword, signOut} from '@firebase/auth'
import {auth, getCurrentUser} from 'config'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {TData} from 'types'
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/requests'
import {TOverloadedReturnType} from 'utils/typescript/overload'

type TType = 'CHECK' | 'SIGN_OUT' | 'SIGN_IN' | 'SIGN_UP'
type TConfig = {data: TData; src: string}
type TConfigType<K extends keyof TConfig | void, T extends TType> = K extends string
  ? Pick<TConfig, K> & {type: T}
  : {type: T}

export function createAuthRequest(type: 'CHECK' | 'SIGN_OUT'): TConfigType<void, typeof type>

export function createAuthRequest(type: 'SIGN_IN' | 'SIGN_UP', data: TData): TConfigType<'data', typeof type>

export function createAuthRequest(type: TType, data?: TData) {
  switch (type) {
    case 'CHECK':
    case 'SIGN_OUT':
      return {type}
    case 'SIGN_IN':
    case 'SIGN_UP':
      return {type, data}
  }
}

export type TAuthRequestConfig = TOverloadedReturnType<typeof createAuthRequest>

export const authRequest = async <Result>(
  config: TAuthRequestConfig,
  interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
  const interceptorToUse = interceptor || defaultInterceptor
  const {type} = config
  let response

  switch (type) {
    case 'SIGN_IN': {
      const email = config.data.email as string
      const password = config.data.password as string
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      response = userCredential.user
      break
    }

    case 'SIGN_UP': {
      const email = config.data.email as string
      const password = config.data.password as string
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      response = userCredential.user
      break
    }

    case 'CHECK':
      response = await getCurrentUser(auth)
      break

    case 'SIGN_OUT':
      await signOut(auth)
      response = true
      break
  }

  return interceptorToUse(response)
}
