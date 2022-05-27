import {createFirebaseAuthRequest} from 'utils/requestAuth';

export const signUpRequest = (data: {[key: string]: string}) => createFirebaseAuthRequest({type: 'SIGN_UP', data});
