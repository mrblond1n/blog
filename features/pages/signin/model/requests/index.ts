import {TData} from 'types';
import {createAuthRequest} from 'utils/requests/requestAuth';

export const signInRequest = (data: TData) => createAuthRequest('SIGN_IN', data);
export const signOutRequest = () => createAuthRequest('SIGN_OUT');
