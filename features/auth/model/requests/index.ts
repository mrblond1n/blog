import {createFirebaseAuthRequest} from 'utils/request';

export const signInRequest = (data: {[key: string]: string}) => createFirebaseAuthRequest({type: 'SIGN_IN', data});
export const signOutRequest = () => createFirebaseAuthRequest({type: 'SIGN_OUT'});
export const signUpRequest = (data: {[key: string]: string}) => createFirebaseAuthRequest({type: 'SIGN_UP', data});
