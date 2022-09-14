import {createAuthRequest} from 'utils/requests/requestAuth';

export const signInRequest = (data: {[key: string]: string}) => createAuthRequest('SIGN_IN', data);
export const signOutRequest = () => createAuthRequest('SIGN_OUT');
