import {createUserWithEmailAndPassword, signOut, updateProfile} from '@firebase/auth';
import {auth, getCurrentUser} from 'config';
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
            const credential = await signInWithEmailAndPassword(auth, data.email, data.password);

            response = credential.user;
            break;
        }
        case 'SIGN_OUT': {
            await signOut(auth);
            response = true;

            break;
        }

        case 'SIGN_UP': {
            const displayName = data.displayName;
            const credential = await createUserWithEmailAndPassword(auth, data.email, data.password).then(userCrd => {
                updateProfile(userCrd.user, {displayName});

                return userCrd;
            });

            response = {...credential.user, displayName};
            break;
        }
    }

    return interceptorToUse(response);
};
