import {createUserWithEmailAndPassword, signOut, updateProfile} from '@firebase/auth';
import {auth, getCurrentUser, returnUserWithRole} from 'config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/request';
import {TOverloadedReturnType} from 'utils/typescript/overload';

type TUser = {email: string; password: string; displayName: string};
type TConfig<T, D = void> = {data: D; type: T};

export function createAuthRequest(type: 'CHECK' | 'SIGN_OUT'): TConfig<typeof type>;
export function createAuthRequest(type: 'SIGN_IN' | 'SIGN_UP', data: any): TConfig<typeof type, TUser>;
export function createAuthRequest(type: string, data?: any) {
    return {type, data};
}

export type TAuthRequestConfig = TOverloadedReturnType<typeof createAuthRequest>;

export const authRequest = async <Result>(
    config: TAuthRequestConfig,
    interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
    const interceptorToUse = interceptor || defaultInterceptor;
    const {type, data} = config;
    let response;

    if (type === 'CHECK') {
        response = await getCurrentUser(auth);
    } else if (type === 'SIGN_IN') {
        response = await signInWithEmailAndPassword(auth, data.email, data.password).then(async userCrd => {
            return await returnUserWithRole(userCrd.user);
        });
    } else if (type === 'SIGN_OUT') {
        await signOut(auth);
        response = true;
    } else if (type === 'SIGN_UP') {
        const displayName = data.displayName;

        response = await createUserWithEmailAndPassword(auth, data.email, data.password).then(async userCrd => {
            await updateProfile(userCrd.user, {displayName});

            return await returnUserWithRole(userCrd.user);
        });
    }

    return interceptorToUse(response);
};
