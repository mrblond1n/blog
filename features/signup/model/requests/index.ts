import {createFirebaseAuthRequest} from 'utils/request';

export const signUpRequest = (data: {[key: string]: string}) => createFirebaseAuthRequest({type: 'SIGN_UP', data});
