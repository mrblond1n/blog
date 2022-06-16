import {createAuthRequest} from 'utils/requestAuth';
import {createFirestoreRequest} from 'utils/requestFirestore';

export const checkAuthRequest = () => createAuthRequest('CHECK');
export const getUserRequest = (uid: string) => createFirestoreRequest('GET', 'users', uid);
