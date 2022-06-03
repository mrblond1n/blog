import {createAuthRequest} from 'utils/requestAuth';

export const signUpRequest = (data: {[key: string]: string}) => createAuthRequest({type: 'SIGN_UP', data});
