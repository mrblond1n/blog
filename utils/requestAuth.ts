import {createUserWithEmailAndPassword, signOut, updateProfile} from '@firebase/auth';
import {auth, getCurrentUser, returnUserWithRole} from 'config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/request';

export type TAuthRequestConfig = {
    data?: any;
    type: 'CHECK' | 'SIGN_IN' | 'SIGN_OUT' | 'SIGN_UP';
};

export const createAuthRequest = ({type, data}: TAuthRequestConfig) => ({type, data});

export const authRequest = async <Result>(
    config: TAuthRequestConfig,
    interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
    const interceptorToUse = interceptor || defaultInterceptor;
    let response;
    const {data, type} = config;

    switch (type) {
        case 'CHECK': {
            response = await getCurrentUser(auth);

            break;
        }
        case 'SIGN_IN': {
            response = await signInWithEmailAndPassword(auth, data.email, data.password).then(async userCrd => {
                return await returnUserWithRole(userCrd.user);
            });

            break;
        }
        case 'SIGN_OUT': {
            await signOut(auth);
            response = true;

            break;
        }

        case 'SIGN_UP': {
            const displayName = data.displayName;

            response = await createUserWithEmailAndPassword(auth, data.email, data.password).then(async userCrd => {
                await updateProfile(userCrd.user, {displayName});

                return await returnUserWithRole(userCrd.user);
            });

            break;
        }
    }

    return interceptorToUse(response);
};
