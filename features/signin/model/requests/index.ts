import {createAuthRequest} from 'utils/requestAuth';

export const signInRequest = (data: {[key: string]: string}) => createAuthRequest({type: 'SIGN_IN', data});
export const signOutRequest = () => createAuthRequest({type: 'SIGN_OUT'});
