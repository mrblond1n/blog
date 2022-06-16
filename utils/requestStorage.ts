import {storage} from 'config';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/request';
import {TOverloadedReturnType} from 'utils/typescript/overload';

type TConfig<T, U, F = void> = {file: F; type: T; url: U};
type TFile = Blob | Uint8Array | ArrayBuffer;

export function createStorageRequest(type: 'DOWNLOAD', url: string): TConfig<typeof type, string>;
export function createStorageRequest(type: 'UPLOAD', url: any, file: TFile): TConfig<typeof type, string, typeof file>;
export function createStorageRequest(type: string, url: string, file?: any) {
    return {type, url, file};
}

export type TStorageRequestConfig = TOverloadedReturnType<typeof createStorageRequest>;

export const storageRequest = async <Result>(
    config: TStorageRequestConfig,
    interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
    const interceptorToUse = interceptor || defaultInterceptor;
    let response;
    const {file, type, url} = config;

    switch (type) {
        case 'DOWNLOAD': {
            response = await getDownloadURL(ref(storage, url));

            break;
        }
        case 'UPLOAD': {
            response = await uploadBytes(ref(storage, url), file).then(snapshot => getDownloadURL(snapshot.ref));

            break;
        }
    }

    return interceptorToUse(response);
};
