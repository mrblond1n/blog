import {TUserDto} from 'types/dtos/user.dto';
import {createAuthRequest} from 'utils/requests/requestAuth';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

export const signUpRequest = (data: {[key: string]: string}) => createAuthRequest('SIGN_UP', data);

export const createUserRequest = (data: TUserDto) => createFirestoreRequest('SET', 'users', data, data.uid);
