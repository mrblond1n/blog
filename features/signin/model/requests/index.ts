import {createFirebaseAuthRequest} from 'utils/request';

export const signInRequest = (data: {[key: string]: string}) => createFirebaseAuthRequest({type: 'SIGN_IN', data});
export const signOutRequest = () => createFirebaseAuthRequest({type: 'SIGN_OUT'});
