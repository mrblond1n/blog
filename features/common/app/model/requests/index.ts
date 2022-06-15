import {createAuthRequest} from 'utils/requestAuth';
import {createFirestoreRequest} from 'utils/requestFirestore';

export const checkAuthRequest = () => createAuthRequest({type: 'CHECK'});
export const getUserRequest = (uid: string) => createFirestoreRequest({type: 'GET', collection: 'users', id: uid});
