import {createAuthRequest} from 'utils/requests/requestAuth';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

export const checkAuthRequest = () => createAuthRequest('CHECK');
export const getUserRequest = (uid: string) => createFirestoreRequest('GET', 'users', uid);
