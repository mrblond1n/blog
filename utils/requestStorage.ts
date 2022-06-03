import {storage} from 'config';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/request';

export type TStorageRequestConfig = {
    file?: Blob | Uint8Array | ArrayBuffer;
    type: 'DOWNLOAD' | 'UPLOAD';
    url: string;
};

export const createStorageRequest = (props: TStorageRequestConfig) => props;

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
            if (!file) throw new Error('not found file');
            await uploadBytes(ref(storage, url), file);

            response = true;

            break;
        }
    }

    return interceptorToUse(response);
};
