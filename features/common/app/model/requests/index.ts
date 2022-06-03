import {createAuthRequest} from 'utils/requestAuth';

export const checkAuthRequest = () => createAuthRequest({type: 'CHECK'});
