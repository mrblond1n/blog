import {createFirebaseAuthRequest} from 'utils/requestAuth';

export const checkAuthRequest = () => createFirebaseAuthRequest({type: 'CHECK'});
