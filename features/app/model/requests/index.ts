import {createFirebaseAuthRequest} from 'utils/request';

export const checkAuthRequest = () => createFirebaseAuthRequest({type: 'CHECK'});
