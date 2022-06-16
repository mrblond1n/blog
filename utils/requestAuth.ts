import {createUserWithEmailAndPassword, signOut, updateProfile} from '@firebase/auth';
import {auth, getCurrentUser, returnUserWithRole} from 'config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/request';
import {TOverloadedReturnType} from 'utils/typescript/overload';

type TUser = {[key: string]: string};
type TType = 'CHECK' | 'SIGN_OUT' | 'SIGN_IN' | 'SIGN_UP';
type TConfig = {data: TUser; src: string};
type TConfigType<K extends keyof TConfig | void, T extends TType> = K extends string
    ? Pick<TConfig, K> & {type: T}
    : {type: T};

export function createAuthRequest(type: 'CHECK' | 'SIGN_OUT'): TConfigType<void, typeof type>;

export function createAuthRequest(type: 'SIGN_IN' | 'SIGN_UP', data: TUser): TConfigType<'data', typeof type>;

export function createAuthRequest(type: TType, data?: TUser) {
    switch (type) {
        case 'CHECK':
        case 'SIGN_OUT':
            return {type};
        case 'SIGN_IN':
        case 'SIGN_UP':
            return {type, data};
    }
}

export type TAuthRequestConfig = TOverloadedReturnType<typeof createAuthRequest>;

export const authRequest = async <Result>(
    config: TAuthRequestConfig,
    interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
    const interceptorToUse = interceptor || defaultInterceptor;
    const {type} = config;
    let response;

    switch (type) {
        case 'SIGN_IN': {
            response = await signInWithEmailAndPassword(auth, config.data.email, config.data.password).then(
                async userCrd => {
                    return await returnUserWithRole(userCrd.user);
                }
            );
            break;
        }

        case 'SIGN_UP': {
            const displayName = config.data.displayName;

            response = await createUserWithEmailAndPassword(auth, config.data.email, config.data.password).then(
                async userCrd => {
                    await updateProfile(userCrd.user, {displayName});

                    return await returnUserWithRole(userCrd.user);
                }
            );
            break;
        }
        case 'CHECK':
            response = await getCurrentUser(auth);
            break;

        case 'SIGN_OUT':
            await signOut(auth);
            response = true;
            break;
    }

    return interceptorToUse(response);
};
