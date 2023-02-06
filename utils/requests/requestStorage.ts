import {storage} from 'config'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/requests'
import {TOverloadedReturnType} from 'utils/typescript/overload'

type TFile = Blob | Uint8Array | ArrayBuffer
type TType = 'DOWNLOAD' | 'UPLOAD'
type TConfig = {file: TFile; url: string}
type TConfigType<K extends keyof TConfig, T extends TType> = Pick<TConfig, K> & {type: T}

export function createStorageRequest(type: 'DOWNLOAD', url: string): TConfigType<'url', typeof type>

export function createStorageRequest(type: 'UPLOAD', url: string, file: TFile): TConfigType<'url' | 'file', typeof type>

export function createStorageRequest(type: TType, url: string, file?: TFile) {
  switch (type) {
    case 'DOWNLOAD':
      return {type, url}
    case 'UPLOAD':
      return {type, url, file}
  }
}

export type TStorageRequestConfig = TOverloadedReturnType<typeof createStorageRequest>

export const storageRequest = async <Result>(
  config: TStorageRequestConfig,
  interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
  const interceptorToUse = interceptor || defaultInterceptor
  let response
  const {type, url} = config

  switch (type) {
    case 'DOWNLOAD': {
      response = await getDownloadURL(ref(storage, url))

      break
    }

    case 'UPLOAD': {
      response = await uploadBytes(ref(storage, url), config.file).then(snapshot => getDownloadURL(snapshot.ref))

      break
    }
  }

  return interceptorToUse(response)
}
